from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.http import featured, products, shop

app = FastAPI(title="E-Commerce Backend API")

app.include_router(products.router)
app.include_router(shop.router)
app.include_router(featured.router)


@app.get("/")
async def read_root():
    return {"status": "healthy", "message": "FastAPI server is running"}


@app.get("/health/db")
async def health_db(db: AsyncSession = Depends(get_db)):
    await db.execute(text("SELECT 1"))
    return {"status": "healthy", "message": "database connection is working"}
