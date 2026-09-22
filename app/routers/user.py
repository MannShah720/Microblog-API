from fastapi import FastAPI, Response, Body, status, HTTPException, Depends, APIRouter
from .. import models, schemas, utils
from sqlalchemy.orm import Session
from ..database import get_db

router = APIRouter()

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

# ========= Create a new user =========
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_password = utils.hash(user.password)

    new_user = models.User(
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

# ========= Get a user =========
@router.get("/{id}", response_model=schemas.UserOut)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()

    if user == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"User with id {id} not found")
    
    return user