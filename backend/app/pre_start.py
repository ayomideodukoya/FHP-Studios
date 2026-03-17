import logging
import asyncio
from tenacity import retry, stop_after_attempt, wait_fixed
from sqlalchemy.ext.asyncio import create_async_engine
from app.core.config import settings
from app.core import security
from app.models.all import AdminUser
from app.db.session import async_session_maker
from alembic.config import Config
from alembic import command
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

max_tries = 60 * 5  # 5 minutes
wait_seconds = 1

@retry(
    stop=stop_after_attempt(max_tries),
    wait=wait_fixed(wait_seconds),
)
async def init_db() -> None:
    try:
        db_url = settings.DATABASE_URL
        if db_url.startswith("sqlite://") and not db_url.startswith("sqlite+aiosqlite://"):
            db_url = db_url.replace("sqlite://", "sqlite+aiosqlite://", 1)
        engine = create_async_engine(db_url)
        async with engine.begin() as conn:
            await conn.execute(
                __import__("sqlalchemy").text("SELECT 1")
            )
        logger.info("Database connection established successfully.")
    except Exception as e:
        logger.error(e)
        raise e

async def create_initial_admin() -> None:
    async with async_session_maker() as session:
        result = await session.execute(
            __import__("sqlalchemy").future.select(AdminUser).filter(AdminUser.username == settings.FIRST_ADMIN_USERNAME)
        )
        user = result.scalars().first()
        if not user:
            logger.info("Creating initial admin user...")
            new_user = AdminUser(
                username=settings.FIRST_ADMIN_USERNAME,
                hashed_password=security.get_password_hash(settings.FIRST_ADMIN_PASSWORD),
                is_active=True,
            )
            session.add(new_user)
            await session.commit()
            logger.info("Initial admin user created successfully.")

import concurrent.futures

def run_migrations() -> None:
    logger.info("Running Alembic upgrade head...")
    # Change working directory so Alembic finds its config and env.py
    os.chdir(os.path.join(os.path.dirname(__file__), ".."))
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")
    logger.info("Database migrations completed successfully.")

async def main() -> None:
    logger.info("Initializing pre-start routine")
    await init_db()

    # Run migrations in a separate thread so it doesn't clash with the current event loop
    loop = asyncio.get_running_loop()
    with concurrent.futures.ThreadPoolExecutor() as pool:
        await loop.run_in_executor(pool, run_migrations)

    await create_initial_admin()
    logger.info("Pre-start routine finished")

if __name__ == "__main__":
    asyncio.run(main())
