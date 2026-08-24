import uuid

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Product
from app.repository import product_repository
from app.schema.product import ProductCreate, ProductUpdate


async def create_product(db: AsyncSession, data: ProductCreate) -> Product:
    return await product_repository.create(db, data)


async def get_product(db: AsyncSession, product_id: uuid.UUID) -> Product:
    product = await product_repository.get_by_id(db, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


async def list_products(
    db: AsyncSession, *, only_active: bool = False, category: str | None = None
) -> list[Product]:
    return await product_repository.list_all(db, only_active=only_active, category=category)


async def update_product(db: AsyncSession, product_id: uuid.UUID, data: ProductUpdate) -> Product:
    product = await get_product(db, product_id)
    return await product_repository.update(db, product, data)


async def delete_product(db: AsyncSession, product_id: uuid.UUID) -> None:
    product = await get_product(db, product_id)
    await product_repository.delete(db, product)
