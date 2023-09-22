import csv
from sqlalchemy.orm import Session
from app.database import SessionLocal, Base, engine
from app import models
from .temp_insert_data import psycopg2_insert_data

def init_db(db: Session) -> None:
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(bind=engine)
    # psycopg2_insert_data()