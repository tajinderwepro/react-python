from fastapi import APIRouter

router = APIRouter()

@router.get("/products")
def get_products():
    return {"msg": "List of products"}
