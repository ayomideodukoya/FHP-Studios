from pydantic import BaseModel, EmailStr, Field, field_validator
import datetime
from typing import Optional
import html

# --- Utility to sanitize input (prevent basic XSS)
def sanitize_html(v: str | None) -> str | None:
    if v is None:
        return v
    return html.escape(v)

# --- Event Schemas ---
class EventBase(BaseModel):
    title: str = Field(..., max_length=100)
    description: str
    date_time: datetime.datetime
    location: str = "FHP Studios, Plot 32 Oba Ogunji Road, Ogba, Lagos"
    image_url: Optional[str] = None

    @field_validator("title", "description", "location")
    def sanitize_event_fields(cls, v):
        return sanitize_html(v)

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: int
    class Config:
        from_attributes = True

# --- Booking Schemas ---
class BookingCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., max_length=20)
    preferred_date: datetime.datetime
    event_type: str = Field(..., max_length=100)
    expected_guests: int = Field(..., gt=0, le=500)
    message: Optional[str] = None

    @field_validator("name", "phone", "event_type", "message")
    def sanitize_booking_fields(cls, v):
        return sanitize_html(v)

class BookingResponse(BookingCreate):
    id: int
    created_at: datetime.datetime
    class Config:
        from_attributes = True

# --- Contact Schemas ---
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., max_length=200)
    message: str = Field(...)

    @field_validator("name", "subject", "message")
    def sanitize_contact_fields(cls, v):
        return sanitize_html(v)

class ContactResponse(ContactCreate):
    id: int
    created_at: datetime.datetime
    class Config:
        from_attributes = True
