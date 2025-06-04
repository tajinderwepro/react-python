from fastapi import FastAPI
from .routes import user
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify ["http://localhost:3000"]
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
