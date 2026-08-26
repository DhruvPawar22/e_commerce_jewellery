from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.http import featured, shop
from app.http.admin import auth as admin_auth
from app.http.admin import featured as admin_featured
from app.http.admin import products as admin_products

app = FastAPI(title="E-Commerce Backend API")

app.include_router(admin_auth.router)
app.include_router(admin_products.router)
app.include_router(admin_featured.router)
app.include_router(shop.router)
app.include_router(featured.router)


@app.get("/")
async def read_root():
    return {"status": "healthy", "message": "FastAPI server is running"}


@app.get("/health/db")
async def health_db(db: AsyncSession = Depends(get_db)):
    await db.execute(text("SELECT 1"))
    return {"status": "healthy", "message": "database connection is working"}
