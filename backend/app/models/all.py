from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
import datetime
from app.db.session import Base

class AdminUser(Base):
    __tablename__ = "admin_users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), index=True, nullable=False)
    description = Column(Text, nullable=False)
    date_time = Column(DateTime, nullable=False)
    location = Column(String(200), default="FHP Studios, Plot 32 Oba Ogunji Road, Ogba, Lagos")
    image_url = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    brand_name = Column(String(100), nullable=True)
    email = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    space_usage = Column(String(100), nullable=False)
    guest_size = Column(String(50), nullable=False)
    preferred_date = Column(DateTime, nullable=False)
    duration = Column(String(50), nullable=False)
    addons = Column(Text, nullable=True)
    external_vendors = Column(Boolean, default=False)
    vision_notes = Column(Text, nullable=True)
    attribution = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
