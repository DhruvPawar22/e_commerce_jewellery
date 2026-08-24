import uuid

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schema.featured import FeaturedProductCreate
from app.schema.product import ProductRead
from app.service import featured_service

router = APIRouter(prefix="/featured", tags=["featured"])


@router.get("", response_model=list[ProductRead])
async def list_featured(db: AsyncSession = Depends(get_db)):
    return await featured_service.list_featured(db)


@router.post("", status_code=status.HTTP_201_CREATED)
async def add_featured(data: FeaturedProductCreate, db: AsyncSession = Depends(get_db)):
    await featured_service.add_featured(db, data.product_id, data.display_order)
    return {"status": "added"}


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_featured(product_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    await featured_service.remove_featured(db, product_id)
