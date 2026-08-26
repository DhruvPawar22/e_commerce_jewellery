import uuid

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import require_admin
from app.database import get_db
from app.schema.product import ProductCreate, ProductRead, ProductUpdate
from app.schema.product_image import ProductImageCreate, ProductImageUpdate
from app.service import product_service

router = APIRouter(
    prefix="/admin/products", tags=["admin-products"], dependencies=[Depends(require_admin)]
)


@router.post("", response_model=ProductRead, status_code=status.HTTP_201_CREATED)
async def create_product(data: ProductCreate, db: AsyncSession = Depends(get_db)):
    return await product_service.create_product(db, data)


@router.get("", response_model=list[ProductRead])
async def list_products(category: str | None = None, db: AsyncSession = Depends(get_db)):
    return await product_service.list_products(db, category=category)


@router.get("/{product_id}", response_model=ProductRead)
async def get_product(product_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    return await product_service.get_product(db, product_id)


@router.patch("/{product_id}", response_model=ProductRead)
async def update_product(
    product_id: uuid.UUID, data: ProductUpdate, db: AsyncSession = Depends(get_db)
):
    return await product_service.update_product(db, product_id, data)


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(product_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    await product_service.delete_product(db, product_id)


@router.post("/{product_id}/images", response_model=ProductRead, status_code=status.HTTP_201_CREATED)
async def add_product_image(
    product_id: uuid.UUID, data: ProductImageCreate, db: AsyncSession = Depends(get_db)
):
    return await product_service.add_product_image(db, product_id, data.url, data.display_order)


@router.delete("/{product_id}/images/{image_id}", response_model=ProductRead)
async def remove_product_image(
    product_id: uuid.UUID, image_id: uuid.UUID, db: AsyncSession = Depends(get_db)
):
    return await product_service.remove_product_image(db, product_id, image_id)


@router.patch("/{product_id}/images/{image_id}", response_model=ProductRead)
async def reorder_product_image(
    product_id: uuid.UUID,
    image_id: uuid.UUID,
    data: ProductImageUpdate,
    db: AsyncSession = Depends(get_db),
):
    return await product_service.reorder_product_image(db, product_id, image_id, data.display_order)
