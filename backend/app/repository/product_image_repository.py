import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.models import ProductImage


async def add(db: AsyncSession, product_id: uuid.UUID, url: str, display_order: int) -> ProductImage:
    image = ProductImage(product_id=product_id, url=url, display_order=display_order)
    db.add(image)
    await db.commit()
    await db.refresh(image)
    return image


async def get_by_id(db: AsyncSession, image_id: uuid.UUID) -> ProductImage | None:
    return await db.get(ProductImage, image_id)


async def remove(db: AsyncSession, image: ProductImage) -> None:
    await db.delete(image)
    await db.commit()


async def update_display_order(db: AsyncSession, image: ProductImage, display_order: int) -> ProductImage:
    image.display_order = display_order
    await db.commit()
    await db.refresh(image)
    return image
