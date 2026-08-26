import asyncio

import cloudinary.uploader
from fastapi import HTTPException, UploadFile, status

from app.core import cloudinary_client  # noqa: F401  (import runs cloudinary.config())

ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB


async def upload_product_image(file: UploadFile) -> str:
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only JPEG, PNG, WEBP, or GIF images are allowed",
        )

    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image must be smaller than 5MB",
        )

    result = await asyncio.to_thread(
        cloudinary.uploader.upload,
        contents,
        folder="products",
        resource_type="image",
    )
    return result["secure_url"]
