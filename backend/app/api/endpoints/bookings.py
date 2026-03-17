from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.api import deps
from app.models.all import Booking, AdminUser
from app.schemas.all import BookingCreate, BookingResponse

router = APIRouter()

@router.post("/", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
async def create_booking(
    *,
    db: AsyncSession = Depends(deps.get_db),
    booking_in: BookingCreate,
) -> Any:
    """
    Create new booking request.
    """
    booking = Booking(
        name=booking_in.name,
        brand_name=booking_in.brand_name,
        email=booking_in.email,
        phone=booking_in.phone,
        space_usage=booking_in.space_usage,
        guest_size=booking_in.guest_size,
        preferred_date=booking_in.preferred_date,
        duration=booking_in.duration,
        addons=",".join(booking_in.addons) if booking_in.addons else None,
        external_vendors=booking_in.external_vendors,
        vision_notes=booking_in.vision_notes,
        attribution=booking_in.attribution
    )
    db.add(booking)
    await db.commit()
    await db.refresh(booking)
    return booking

@router.get("/", response_model=List[BookingResponse])
async def read_bookings(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: AdminUser = Depends(deps.get_current_admin),
) -> Any:
    """
    Retrieve bookings. Protected route.
    """
    result = await db.execute(select(Booking).order_by(Booking.created_at.desc()).offset(skip).limit(limit))
    return result.scalars().all()
