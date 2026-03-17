import logging
import sys
from sqlalchemy import inspect
from alembic.config import Config
from alembic import command
from database import engine

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main():
    try:
        logger.info("Initializing pre-start routine: Checking database schema...")
        inspector = inspect(engine)
        has_bookings = inspector.has_table("bookings")
        has_alembic = inspector.has_table("alembic_version")

        alembic_cfg = Config("alembic.ini")

        if has_bookings and not has_alembic:
            logger.info("Existing database found without Alembic tracking. Stamping with initial schema ('f1b6ab4a35ef')...")
            command.stamp(alembic_cfg, "f1b6ab4a35ef")

        logger.info("Running Alembic upgrade head...")
        command.upgrade(alembic_cfg, "head")
        logger.info("Database migrations completed successfully.")
    except Exception as e:
        logger.error(f"FATAL ERROR during pre-start migrations: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
