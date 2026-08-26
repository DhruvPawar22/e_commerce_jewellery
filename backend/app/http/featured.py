from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schema.product import ProductRead
from app.service import featured_service

router = APIRouter(prefix="/featured", tags=["featured"])


@router.get("", response_model=list[ProductRead])
async def list_featured(db: AsyncSession = Depends(get_db)):
    return await featured_service.list_featured(db)
