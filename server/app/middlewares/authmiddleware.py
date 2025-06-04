from fastapi import Request
from fastapi.responses import JSONResponse

async def authenticate_user(request: Request, call_next):
    # Allow CORS preflight requests
    if request.method == "OPTIONS":
        return await call_next(request)

    # Public/open paths that don't require auth
    open_paths = ["/auth/login", "/docs", "/openapi.json", "/redoc"]

    if request.url.path in open_paths:
        return await call_next(request)

    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return JSONResponse(status_code=401, content={"detail": "Unauthorized"})

    token = auth_header.split(" ")[1]

    # Dummy check – replace with real token validation
    if token != "valid_token":
        return JSONResponse(status_code=401, content={"detail": "Invalid token"})

    # Proceed with the request
    response = await call_next(request)
    return response
