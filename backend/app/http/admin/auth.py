from fastapi import APIRouter, Depends, HTTPException, Response, status

from app.core.security import (
    ADMIN_PASSWORD_HASH,
    ADMIN_USERNAME,
    COOKIE_NAME,
    COOKIE_SECURE,
    JWT_EXPIRE_MINUTES,
    create_access_token,
    require_admin,
    verify_password,
)
from app.schema.auth import LoginRequest, MeResponse

router = APIRouter(prefix="/admin", tags=["admin-auth"])


@router.post("/login")
async def login(data: LoginRequest, response: Response):
    if data.username != ADMIN_USERNAME or not ADMIN_PASSWORD_HASH:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    if not verify_password(data.password, ADMIN_PASSWORD_HASH):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token(subject=ADMIN_USERNAME)
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax",
        max_age=JWT_EXPIRE_MINUTES * 60,
    )
    return {"status": "logged in"}


@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key=COOKIE_NAME)
    return {"status": "logged out"}


@router.get("/me", response_model=MeResponse)
async def me(admin: str = Depends(require_admin)):
    return MeResponse(username=admin)
