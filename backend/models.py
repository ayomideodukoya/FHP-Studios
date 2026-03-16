from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from database import Base
import datetime

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), index=True, nullable=False)
    description = Column(Text, nullable=False)
    date_time = Column(DateTime, nullable=False)
    location = Column(String(200), default="FHP Studios, Plot 32 Oba Ogunji Road, Ogba, Lagos")
    image_url = Column(String(255), nullable=True)

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    preferred_date = Column(DateTime, nullable=False)
    event_type = Column(String(100), nullable=False)
    expected_guests = Column(Integer, nullable=False)
    message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
