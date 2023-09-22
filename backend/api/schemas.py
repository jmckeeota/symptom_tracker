from pydantic import BaseModel
import datetime
from typing import Optional, List, ForwardRef, Tuple

class SymptomBase(BaseModel):
 
    class Config:
        orm_mode = True

class Symptom(SymptomBase):
    id: int
    name: str

EntryRef = ForwardRef('Entry')

class SymptomItemBase(BaseModel):
    class Config:
        orm_mode = True

class SymptomItem(SymptomItemBase):
    id: int
    symptom: Symptom
    symptom_description: Optional[str] | None = None

class SymptomItemCreate(SymptomItemBase):
    symptom_id: int
    symptom_description: Optional[str] | None = None


class EntryBase(BaseModel):
    class Config:
        orm_mode = True

class Entry(EntryBase):
    id: int
    name: str
    symptom_item: List[SymptomItem]

class EntryCreate(EntryBase):
    name: str
    symptom_item_list: Optional[List[SymptomItemCreate]] | None = None

class EntryDelete(EntryBase):
    id: int
