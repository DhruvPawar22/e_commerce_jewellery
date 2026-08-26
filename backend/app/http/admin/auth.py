from fastapi import APIRouter, HTTPException, status

from app.core.security import (
    ADMIN_PASSWORD_HASH,
    ADMIN_USERNAME,
    create_access_token,
    verify_password,
)
from app.schema.auth import LoginRequest, TokenResponse

router = APIRouter(prefix="/admin", tags=["admin-auth"])


@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest):
    if data.username != ADMIN_USERNAME or not ADMIN_PASSWORD_HASH:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    if not verify_password(data.password, ADMIN_PASSWORD_HASH):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token(subject=ADMIN_USERNAME)
    return TokenResponse(access_token=token)
