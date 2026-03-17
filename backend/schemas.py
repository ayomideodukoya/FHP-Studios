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
    brand_name: Optional[str] = Field(None, max_length=100)
    email: EmailStr
    phone: str = Field(..., max_length=20)
    space_usage: str = Field(..., max_length=100)
    guest_size: str = Field(..., max_length=50)
    preferred_date: datetime.datetime
    duration: str = Field(..., max_length=50)
    addons: Optional[list[str]] = Field(default_factory=list)
    external_vendors: bool = False
    vision_notes: Optional[str] = None
    attribution: Optional[str] = Field(None, max_length=100)

    @field_validator("name", "brand_name", "phone", "space_usage", "guest_size", "duration", "vision_notes", "attribution")
    def sanitize_booking_fields(cls, v):
        return sanitize_html(v)

class BookingResponse(BaseModel):
    id: int
    name: str
    brand_name: Optional[str] = None
    email: EmailStr
    phone: str
    space_usage: str
    guest_size: str
    preferred_date: datetime.datetime
    duration: str
    addons: Optional[str] = None  # Returned as the raw stored string
    external_vendors: bool
    vision_notes: Optional[str] = None
    attribution: Optional[str] = None
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
