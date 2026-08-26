import uuid

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Product
from app.repository import featured_repository, product_repository


async def list_featured(db: AsyncSession) -> list[Product]:
    return await featured_repository.list_featured_products(db)


async def add_featured(db: AsyncSession, product_id: uuid.UUID, display_order: int) -> None:
    product = await product_repository.get_by_id(db, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    if not product.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot feature an inactive product",
        )

    existing = await featured_repository.get(db, product_id)
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Product is already featured"
        )

    await featured_repository.add(db, product_id, display_order)


async def remove_featured(db: AsyncSession, product_id: uuid.UUID) -> None:
    featured = await featured_repository.get(db, product_id)
    if featured is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product is not featured")
    await featured_repository.remove(db, featured)


async def reorder_featured(db: AsyncSession, product_id: uuid.UUID, display_order: int) -> None:
    featured = await featured_repository.get(db, product_id)
    if featured is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product is not featured")
    await featured_repository.update_display_order(db, featured, display_order)
