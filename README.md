# Microblog API
This is the backend for a microblogging/social media application, built around a REST API.
The API is divided into four main routes:
- Post — Handles creating, reading, updating, and deleting posts
- User — Handles user creation and retrieving users by their ID
- Auth — Handles user authentication and the login system
- Vote — Handles the application's like/upvote system

Check out the documentation: https://microblog-api-11vg.onrender.com/docs

# My learning journey

## Testing
- I used Postman to test my API endpoints throughout development - this allowed me to send different types of requests, inspect the responses & test different scenarios.

## Database
- I used pgAdmin to manage and inspect the database
- I initially used raw SQL but switched to SQLAlchemy as an ORM, allowing me to write sql operations and define my database structure using Python code
- But one limitation that i encountered with SQLAlchemy is that it doesn't allow me to modify tables if they already exist, which means i have to resort to dropping the tables and restarting the application
- This led me to explore Alembic which is a migration tool that allows database schemas to be updated incrementally without having to drop anything and also revert back a previous version

## Login & Authentication
- I implemented user registration with password hashing so that passwords are securely hashed before being stored
- Once logged in, the server generates a JWT which can then be used to authenticate subsequent requests to protected API endpoints - e.g. A user can only update and delete their own posts
