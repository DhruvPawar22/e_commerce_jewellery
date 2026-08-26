import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ProductImageCreate(BaseModel):
    url: str = Field(min_length=1, max_length=500)
    display_order: int = Field(default=0)


class ProductImageUpdate(BaseModel):
    display_order: int


class ProductImageRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    url: str
    display_order: int
    created_at: datetime
