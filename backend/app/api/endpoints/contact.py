from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import deps
from app.models.all import ContactMessage
from app.schemas.all import ContactCreate, ContactResponse

router = APIRouter()

@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def create_contact_message(
    *,
    db: AsyncSession = Depends(deps.get_db),
    contact_in: ContactCreate,
) -> Any:
    """
    Create new contact message request.
    """
    contact = ContactMessage(
        name=contact_in.name,
        email=contact_in.email,
        subject=contact_in.subject,
        message=contact_in.message
    )
    db.add(contact)
    await db.commit()
    await db.refresh(contact)
    return contact
