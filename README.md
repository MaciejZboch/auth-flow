# Get .env from .env.example (real .env with secure secrets was not uploaded to github)

cp .env.example .env

# Run with Docker

docker compose up --build

# Test with Swagger

http://localhost:3000/docs/

# Basic proof of concept frontend flow (to be replaced with proper React frontend in production)

http://localhost:3000/login.html
