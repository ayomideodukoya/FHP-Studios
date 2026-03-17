from sqlalchemy.orm import Session
import models, schemas

# Event Operations
def get_events(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Event).order_by(models.Event.date_time.asc()).offset(skip).limit(limit).all()

def create_event(db: Session, event: schemas.EventCreate):
    db_event = models.Event(**event.dict())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

# Booking Operations
def create_booking(db: Session, booking: schemas.BookingCreate):
    booking_data = booking.dict()
    # Serialize the list of addons into a string before saving
    if "addons" in booking_data:
        addons_list = booking_data.pop("addons")
        booking_data["addons"] = ", ".join(addons_list) if addons_list else None

    db_booking = models.Booking(**booking_data)
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

# Contact Message Operations
def create_contact_message(db: Session, contact: schemas.ContactCreate):
    db_contact = models.ContactMessage(**contact.dict())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact
