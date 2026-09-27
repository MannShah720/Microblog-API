# Microblog REST API

A backend REST API for a microblogging/social media application built with **Python, FastAPI and PostgreSQL**.

The project implements user authentication, post management and an upvote system, with **Docker, automated testing, CI/CD and cloud deployment**.

## 🚀 Live API

**Swagger API Documentation:**
https://microblog-api-11vg.onrender.com/docs

## 🛠️ Tech Stack

- **Backend:** Python, FastAPI, Pydantic
- **Database:** PostgreSQL, SQLAlchemy, Alembic
- **Authentication:** JWT, OAuth2, password hashing
- **Testing:** pytest, Postman
- **DevOps:** Docker, Docker Compose, GitHub Actions, Render
- **Tools:** pgAdmin, Git, Linux

## 📌 Features

The API is organised into four main route groups:

* **Posts** — Create, retrieve, update and delete posts
* **Users** — User registration and retrieving users by ID
* **Auth** — Login and JWT-based authentication
* **Votes** — Like/upvote functionality

Protected endpoints use authentication and authorisation to ensure users can only modify their own posts.

## 🗄️ Database & Migrations

I initially used raw SQL before moving to **SQLAlchemy** as an ORM to manage database operations and models using Python.

To manage changes to the database schema, I implemented **Alembic** migrations. This allows schema changes to be applied incrementally without dropping existing tables and provides the ability to roll back migrations.

## 🔐 Authentication

User passwords are securely **hashed before being stored**.

After login, the API generates a **JWT access token** which is used to authenticate subsequent requests to protected endpoints.

## 🧪 Testing & CI/CD

I used **Postman** throughout development to test endpoints, responses and different scenarios.

The project also includes **pytest** automated tests, which are run through **GitHub Actions**. The CI pipeline also builds the application's Docker image and uses GitHub Secrets for configuration.

## 🐳 Deployment

The application is containerised using **Docker** and deployed to **Render**, with separate development and production configuration.

## 📚 Learning Resource

I developed this project while following a 19-hour FastAPI course, using it as a learning resource while implementing and extending the application:

https://www.youtube.com/watch?v=0sOvCWFmrtA

## 📖 API Documentation

Explore and test the deployed API through the interactive Swagger documentation:

**https://microblog-api-11vg.onrender.com/docs**
