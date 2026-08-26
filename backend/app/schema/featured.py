import uuid

from pydantic import BaseModel, Field


class FeaturedProductCreate(BaseModel):
    product_id: uuid.UUID
    display_order: int = Field(default=0)


class FeaturedProductReorder(BaseModel):
    display_order: int
