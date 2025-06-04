from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, database

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/users")
def read_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return {
        "data": users,
        "msg": "Users fetched successfully"
    }

