import uuid

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Product
from app.repository import product_image_repository, product_repository
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


async def _get_owned_image(db: AsyncSession, product_id: uuid.UUID, image_id: uuid.UUID):
    image = await product_image_repository.get_by_id(db, image_id)
    if image is None or image.product_id != product_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
    return image


async def add_product_image(
    db: AsyncSession, product_id: uuid.UUID, url: str, display_order: int
) -> Product:
    await get_product(db, product_id)  # 404s if the product doesn't exist
    await product_image_repository.add(db, product_id, url, display_order)
    return await get_product(db, product_id)


async def remove_product_image(db: AsyncSession, product_id: uuid.UUID, image_id: uuid.UUID) -> Product:
    await get_product(db, product_id)  # 404s if the product doesn't exist
    image = await _get_owned_image(db, product_id, image_id)
    await product_image_repository.remove(db, image)
    return await get_product(db, product_id)


async def reorder_product_image(
    db: AsyncSession, product_id: uuid.UUID, image_id: uuid.UUID, display_order: int
) -> Product:
    await get_product(db, product_id)  # 404s if the product doesn't exist
    image = await _get_owned_image(db, product_id, image_id)
    await product_image_repository.update_display_order(db, image, display_order)
    return await get_product(db, product_id)
