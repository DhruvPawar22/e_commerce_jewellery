from fastapi import APIRouter, Depends, UploadFile

from app.core.security import require_admin
from app.service.image_service import upload_product_image

router = APIRouter(prefix="/admin/uploads", tags=["admin-uploads"], dependencies=[Depends(require_admin)])


@router.post("/image")
async def upload_image(file: UploadFile):
    url = await upload_product_image(file)
    return {"url": url}
