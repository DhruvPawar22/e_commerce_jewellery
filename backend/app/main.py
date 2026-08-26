import os

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.http import featured, shop
from app.http.admin import auth as admin_auth
from app.http.admin import featured as admin_featured
from app.http.admin import products as admin_products
from app.http.admin import uploads as admin_uploads

app = FastAPI(title="E-Commerce Backend API")

# comma-separated list, e.g. "https://shop.example.com,https://admin.example.com" -- see .env
cors_origins = os.getenv("CORS_ORIGINS", "").split(",") if os.getenv("CORS_ORIGINS") else []

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin_auth.router)
app.include_router(admin_products.router)
app.include_router(admin_featured.router)
app.include_router(admin_uploads.router)
app.include_router(shop.router)
app.include_router(featured.router)


@app.get("/")
async def read_root():
    return {"status": "healthy", "message": "FastAPI server is running"}


@app.get("/health/db")
async def health_db(db: AsyncSession = Depends(get_db)):
    await db.execute(text("SELECT 1"))
    return {"status": "healthy", "message": "database connection is working"}
