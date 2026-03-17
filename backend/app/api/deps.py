from typing import Generator, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core import security
from app.core.config import settings
from app.db.session import async_session_maker
from app.models.all import AdminUser
from app.schemas.all import TokenData

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login"
)

async def get_db() -> Generator[AsyncSession, None, None]:
    async with async_session_maker() as session:
        yield session

async def get_current_admin(
    db: AsyncSession = Depends(get_db), token: str = Depends(reusable_oauth2)
) -> AdminUser:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data = TokenData(username=payload.get("sub"))
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    result = await db.execute(select(AdminUser).filter(AdminUser.username == token_data.username))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="Admin not found")
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive admin")
    return user
