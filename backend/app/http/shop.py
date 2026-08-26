from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schema.product import ProductRead
from app.service import product_service

router = APIRouter(prefix="/shop", tags=["shop"])


@router.get("/products", response_model=list[ProductRead])
async def list_shop_products(category: str | None = None, db: AsyncSession = Depends(get_db)):
    return await product_service.list_products(db, only_active=True, category=category)
