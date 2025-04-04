# Grocery Management Application
This app is built on 3 - tier Architechture
# Tech Stack: 
**Frontend:** Nginx (serving static HTML, CSS, Vanilla JS)

**Backend:** Node.js (Express.js)

**Database:** PostgreSQL

 
# Steps to Run the App:
# Clone the Repo
git clone https://github.com/SB-AWSDevops/docker-compose-3tier

cd grocery-app/docker
# Start the App with Docker Compose
docker-compose up --build

This will:

✔ Build frontend, backend, and database images.

✔ Start all services (db, backend, frontend).

# Access the App
Open http://localhost:9090 in your browser.
Now, your app is live and running! :) 

# Stop the App
docker-compose down

