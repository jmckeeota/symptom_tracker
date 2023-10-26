from . import crud, models, schemas
from fastapi import Depends, FastAPI, HTTPException

from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from .database import SessionLocal, engine

netapi = FastAPI()

models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:30000",
    "localhost:30000",
    "http://frontend:3000",
    "frontend:3000",
    "http://frontend.local:30000"
]

netapi.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@netapi.get("/")
async def get_root():
    return "Welcome to my apis!"

@netapi.get("/symptoms/", response_model=list[schemas.Symptom])
async def read_symptoms(skip: int = 0, limit: int=100, db: Session = Depends(get_db)):
    symptoms = crud.get_symptoms(db, skip=skip, limit=limit)
    return symptoms

@netapi.get("/entries/", response_model=list[schemas.Entry])
async def read_entries(skip: int = 0, limit: int=100, db: Session = Depends(get_db)):
    entries = crud.get_entries(db, skip=skip, limit=limit)
    return entries

@netapi.post("/entries/", response_model=schemas.Entry)
async def create_entry(entry: schemas.EntryCreate, db: Session = Depends(get_db)):
    # Checks go here.  Raise exceptions
    return crud.create_entry(db, entry=entry)

@netapi.delete("/entries/{entry_id}", response_model=schemas.Entry)
async def delete_entry(entry_id: int, db: Session = Depends(get_db)):
    # Checks go here.  Raise exceptions
    return crud.delete_entry(db, entry_id=entry_id)