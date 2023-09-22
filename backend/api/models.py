from .database import Base
from sqlalchemy import create_engine, ForeignKey, Column, String, Integer, DateTime, Float, Boolean, Numeric, func
from datetime import datetime
from sqlalchemy.orm import relationship, column_property, synonym

class Symptoms(Base):
    __tablename__ = "symptoms"
    
    def __repr__(self):
        return f"({self.name})"

    id = Column(Integer(), primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)

    symptom_item = relationship("SymptomItems", back_populates="symptom")


class Entries(Base):
    __tablename__ = "entries"
    
    def __repr__(self):
        return f"({self.name})"

    id = Column(Integer(), primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)

    symptom_item = relationship("SymptomItems", cascade="all,delete-orphan", back_populates="entry")

class SymptomItems(Base):
    __tablename__ = "symptom_items"

    def __repr__(self):
        return f"({self.name})"

    id = Column(Integer(), primary_key=True, autoincrement=True)
    
    symptom_id = Column(ForeignKey("symptoms.id"))
    entry_id = Column(ForeignKey("entries.id"))
    symptom_description = Column(String(255), nullable=False)

    symptom = relationship("Symptoms", back_populates="symptom_item")
    entry = relationship("Entries", back_populates="symptom_item")