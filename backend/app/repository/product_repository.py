import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models import Product
from app.schema.product import ProductCreate, ProductUpdate


async def create(db: AsyncSession, data: ProductCreate) -> Product:
    product = Product(**data.model_dump())
    db.add(product)
    await db.commit()
    await db.refresh(product)
    await db.refresh(product, attribute_names=["images"])
    return product


async def get_by_id(db: AsyncSession, product_id: uuid.UUID) -> Product | None:
    return await db.get(Product, product_id, options=[selectinload(Product.images)])


async def list_all(
    db: AsyncSession, *, only_active: bool = False, category: str | None = None
) -> list[Product]:
    stmt = select(Product).options(selectinload(Product.images))
    if only_active:
        stmt = stmt.where(Product.is_active.is_(True))
    if category:
        stmt = stmt.where(Product.category == category)
    stmt = stmt.order_by(Product.created_at.desc())

    result = await db.execute(stmt)
    return list(result.scalars().all())


async def update(db: AsyncSession, product: Product, data: ProductUpdate) -> Product:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(product, field, value)
    await db.commit()
    await db.refresh(product)
    await db.refresh(product, attribute_names=["images"])
    return product


async def delete(db: AsyncSession, product: Product) -> None:
    await db.delete(product)
    await db.commit()
