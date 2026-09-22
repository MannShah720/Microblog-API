from dotenv import load_dotenv
import os
from fastapi import FastAPI, Response, Body, status, HTTPException, Depends
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from sqlalchemy.orm import Session
from . import models, schemas, utils
from . database import engine, get_db
from typing import List
from .routers import post, user

# ========= .env details =========
load_dotenv()
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# ========= Database connection =========
while True:
    try:
        conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASSWORD, cursor_factory=RealDictCursor)
        cursor = conn.cursor()
        print("Database connection was successful")
        break
        
    except Exception as error:
        print("Database connection failed")
        print("Error:", error)
        time.sleep(2)

app.include_router(post.router)
app.include_router(user.router)

# Root
@app.get("/")
def root():
    return {"message": "Welcome to my api"}