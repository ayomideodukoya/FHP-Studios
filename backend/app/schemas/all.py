from pydantic import BaseModel, EmailStr, Field, field_validator, ConfigDict
import datetime
from typing import Optional, List
import html

def sanitize_html(v: str | None) -> str | None:
    if v is None:
        return v
    return html.escape(str(v).strip())

# Auth & Admin Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class AdminUserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8)

class AdminUserResponse(BaseModel):
    id: int
    username: str
    is_active: bool
    model_config = ConfigDict(from_attributes=True)

# Event Schemas
class EventBase(BaseModel):
    title: str = Field(..., max_length=100)
    description: str
    date_time: datetime.datetime
    location: str = "FHP Studios, Plot 32 Oba Ogunji Road, Ogba, Lagos"
    image_url: Optional[str] = None

    @field_validator("title", "description", "location", "image_url")
    @classmethod
    def sanitize(cls, v):
        return sanitize_html(v)

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: int
    created_at: datetime.datetime
    model_config = ConfigDict(from_attributes=True)

# Booking Schemas
class BookingCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    brand_name: Optional[str] = Field(None, max_length=100)
    email: EmailStr
    phone: str = Field(..., max_length=20)
    space_usage: str = Field(..., max_length=100)
    guest_size: str = Field(..., max_length=50)
    preferred_date: datetime.datetime
    duration: str = Field(..., max_length=50)
    addons: Optional[List[str]] = Field(default_factory=list)
    external_vendors: bool = False
    vision_notes: Optional[str] = None
    attribution: Optional[str] = Field(None, max_length=100)

    @field_validator("name", "brand_name", "phone", "space_usage", "guest_size", "duration", "vision_notes", "attribution")
    @classmethod
    def sanitize(cls, v):
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
    addons: Optional[str] = None
    external_vendors: bool
    vision_notes: Optional[str] = None
    attribution: Optional[str] = None
    created_at: datetime.datetime
    model_config = ConfigDict(from_attributes=True)

# Contact Schemas
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., max_length=200)
    message: str = Field(...)

    @field_validator("name", "subject", "message")
    @classmethod
    def sanitize(cls, v):
        return sanitize_html(v)

class ContactResponse(ContactCreate):
    id: int
    created_at: datetime.datetime
    model_config = ConfigDict(from_attributes=True)
