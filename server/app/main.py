from fastapi import FastAPI
from .routes import user, product
from fastapi.middleware.cors import CORSMiddleware
from .middlewares.authmiddleware import authenticate_user  # import custom middleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify ["http://localhost:3000"]
    allow_methods=["*"],
    allow_headers=["*"],
)
app.middleware("http")(authenticate_user)
app.include_router(user.router)
app.include_router(product.router)
