import uuid

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import require_admin
from app.database import get_db
from app.schema.featured import FeaturedProductCreate, FeaturedProductReorder
from app.service import featured_service

router = APIRouter(
    prefix="/admin/featured", tags=["admin-featured"], dependencies=[Depends(require_admin)]
)


@router.post("", status_code=status.HTTP_201_CREATED)
async def add_featured(data: FeaturedProductCreate, db: AsyncSession = Depends(get_db)):
    await featured_service.add_featured(db, data.product_id, data.display_order)
    return {"status": "added"}


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_featured(product_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    await featured_service.remove_featured(db, product_id)


@router.patch("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def reorder_featured(
    product_id: uuid.UUID, data: FeaturedProductReorder, db: AsyncSession = Depends(get_db)
):
    await featured_service.reorder_featured(db, product_id, data.display_order)
