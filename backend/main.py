from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
import crud
from database import engine, get_db
from config import settings
from admin import router as admin_router

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FHP Studios API",
    description="Backend API for FHP Studios - a hub for creatives.",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to FHP Studios API"}

@app.get("/events/", response_model=List[schemas.EventResponse])
def read_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    events = crud.get_events(db, skip=skip, limit=limit)
    return events

@app.post("/events/", response_model=schemas.EventResponse, status_code=status.HTTP_201_CREATED)
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    return crud.create_event(db=db, event=event)

@app.post("/bookings/", response_model=schemas.BookingResponse, status_code=status.HTTP_201_CREATED)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_booking(db=db, booking=booking)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error processing booking.")

@app.post("/contact/", response_model=schemas.ContactResponse, status_code=status.HTTP_201_CREATED)
def create_contact_message(contact: schemas.ContactCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_contact_message(db=db, contact=contact)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error processing contact message.")
