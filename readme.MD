# Grocery Management Application

This 3 tier grocery app Built and Deployed in a Dockerized Environment using Docker Compose

# Tech Stack: 
**Frontend:** Nginx (serving static HTML, CSS, Vanilla JS)

**Backend:** Node.js (Express.js)

**Database:** PostgreSQL

 
# Steps to Run the App:
# Clone the Repo
git clone https://github.com/SB-AWSDevops/docker-compose-3tier

## Note: This project uses environment variables from .env files for backend and database.

We don’t commit actual .env files to Git for security reasons.

# What You Need To Do?
Wherever docker-compose.yml or any service expects an .env file,
You must manually create it in your local machine or deployment environment.
Without it, services like backend or database won’t work correctly.

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

**UPDATE**
I have added kubernetes manifest files now, so now grocery app can be deployed in minikube k8 too.
- cd k8/
- kubectl apply -f ./db/ -f ./backend/ -f ./frontend/
- now in minikube , we need to do port forwarding for frontend 
- kubectl port-forward svc/grocery-frontend-service 9090:9090
- also port forward to backend to test the api - localhost:5000/groceries
- kubectl port-forward svc/grocery-backend-service 5000:5000
- now you can run the app in browser

