from dotenv import load_dotenv
import os
from fastapi import FastAPI
from . import models
from . database import engine
from .routers import post, user, auth, vote
from pydantic_settings import BaseSettings

# ========= .env details =========
load_dotenv()
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(vote.router)

# Root
@app.get("/")
def root():
    return {"message": "Welcome to my api"}