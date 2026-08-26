import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models import FeaturedProduct, Product


async def list_featured_products(db: AsyncSession) -> list[Product]:
    stmt = (
        select(Product)
        .options(selectinload(Product.images))
        .join(FeaturedProduct, FeaturedProduct.product_id == Product.id)
        .where(Product.is_active.is_(True))
        .order_by(FeaturedProduct.display_order.asc())
    )
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def get(db: AsyncSession, product_id: uuid.UUID) -> FeaturedProduct | None:
    return await db.get(FeaturedProduct, product_id)


async def add(db: AsyncSession, product_id: uuid.UUID, display_order: int) -> FeaturedProduct:
    featured = FeaturedProduct(product_id=product_id, display_order=display_order)
    db.add(featured)
    await db.commit()
    await db.refresh(featured)
    return featured


async def remove(db: AsyncSession, featured: FeaturedProduct) -> None:
    await db.delete(featured)
    await db.commit()


async def update_display_order(
    db: AsyncSession, featured: FeaturedProduct, display_order: int
) -> FeaturedProduct:
    featured.display_order = display_order
    await db.commit()
    await db.refresh(featured)
    return featured
