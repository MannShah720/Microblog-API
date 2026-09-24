This is the backend for a microblogging/social media application, built around a REST API.
The API is divided into four main routes:
- Post — Handles creating, reading, updating, and deleting posts
- User — Handles user creation and retrieving users by their ID
- Auth — Handles user authentication and the login system
- Vote — Handles the application's like/upvote system

My learning journey:
- HTTP methods and status codes
- API testing using Postman
- Connecting to postgres and working with pg admin
- Using SQLAlchemy as an ORM
- User registration with password hashing
- JWT authentication


For the database itself, I used pgAdmin to manage and inspect the database.
I initially used raw SQL to interact with the database.
- As the project grew, I switched to SQLAlchemy as an ORM, allowing me to write sql and define my database structure using Python code
- But one limitation that i encountered with SQLAlchemy is that it doesn't allow us to modify tables if they already exist, which means we have to resort to dropping the tables and restarting the application.
- However, this wouldn't be allowed in a real production database as schema changes need to preserve existing data, which led me to explore Alembic which allow database schemas to be updated incrementally without having to drop existing tables  
