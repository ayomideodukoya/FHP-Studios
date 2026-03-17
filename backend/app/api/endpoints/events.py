from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.api import deps
from app.models.all import Event, AdminUser
from app.schemas.all import EventCreate, EventResponse

router = APIRouter()

@router.get("/", response_model=List[EventResponse])
async def read_events(
    db: AsyncSession = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve upcoming events. Public route.
    """
    result = await db.execute(select(Event).order_by(Event.date_time.asc()).offset(skip).limit(limit))
    return result.scalars().all()

@router.post("/", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
async def create_event(
    *,
    db: AsyncSession = Depends(deps.get_db),
    event_in: EventCreate,
    current_user: AdminUser = Depends(deps.get_current_admin),
) -> Any:
    """
    Create new event. Protected route.
    """
    event = Event(
        title=event_in.title,
        description=event_in.description,
        date_time=event_in.date_time,
        location=event_in.location,
        image_url=event_in.image_url
    )
    db.add(event)
    await db.commit()
    await db.refresh(event)
    return event

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT, response_class=None)
async def delete_event(
    *,
    db: AsyncSession = Depends(deps.get_db),
    id: int,
    current_user: AdminUser = Depends(deps.get_current_admin),
) -> None:
    """
    Delete an event. Protected route.
    """
    result = await db.execute(select(Event).filter(Event.id == id))
    event = result.scalars().first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    await db.delete(event)
    await db.commit()
