from . import models
from sqlalchemy.orm import Session, joinedload, subqueryload
from . import schemas

def get_symptoms(db: Session, skip: int=0, limit: int = 100):
    return db.query(models.Symptoms).offset(skip).limit(limit).all()

def get_entries(db: Session, skip: int=0, limit: int = 100):
    return db.query(models.Entries).offset(skip).limit(limit).all()

def create_entry(db: Session, entry: schemas.EntryCreate):
    db_list_of_symptoms = []
    db_entry = models.Entries(
        name=entry.name
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    for symptom_link in entry.symptom_item_list:
        db_list_of_symptoms.append(models.SymptomItems(
            symptom_id = symptom_link.symptom_id,
            entry_id = db_entry.id,
            symptom_description = symptom_link.symptom_description
        ))
    for db_symptom in db_list_of_symptoms:
        db.add(db_symptom)
        db.commit()
        db.refresh(db_symptom)
    
    return db_entry

def delete_entry(db:Session, entry_id):
    db_entry = db.query(models.Entries).filter(models.Entries.id == entry_id).first()
    print(schemas.EntryDelete(id=db_entry.id))  # Or use any other fields you want.

    db.delete(db_entry)
    db.commit()
    return db_entry