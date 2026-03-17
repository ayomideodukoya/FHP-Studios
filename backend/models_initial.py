from sqlalchemy import Column, Integer, String, DateTime
import datetime
from database import Base

class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), index=True, nullable=False)
    description = Column(String, nullable=False)
    date_time = Column(DateTime, nullable=False)
    location = Column(String, default="FHP Studios, Plot 32 Oba Ogunji Road, Ogba, Lagos")
    image_url = Column(String, nullable=True)

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String(20), nullable=False)
    space_usage = Column(String(100), nullable=False)
    preferred_date = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String, nullable=False)
    subject = Column(String(200), nullable=False)
    message = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
