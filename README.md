How to Run .NET 8 API and Angular Project Locally
This document provides step-by-step instructions to set up and run a .NET 8 Web API backend with an Angular frontend on your local development machine.

### Prerequisites

Make sure the following tools are installed on your machine:

#### Backend (.NET API)
- .NET 8 SDK (https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- IDE or text editor (Visual Studio 2022+, Rider, or VS Code)

#### Frontend (Angular)
- Node.js (v18+ recommended) (https://nodejs.org/)
- Angular CLI:
npm install -g @angular/cli

---

### Backend (.NET 8 API) Setup

1. Clone the Repository
git clone <your-repo-url>
cd <backend-project-folder>

2. Restore Dependencies
dotnet restore

3. Update Configuration
- Edit appsettings.Development.json:
- Add correct connection strings.
- Set API keys if applicable.
- Define allowed CORS origins (e.g., Angular app URL).

4. Run the API
dotnet run
- The API usually runs on https://localhost:5001 or http://localhost:5000.

---

### Frontend (Angular) Setup

1. Navigate to Angular Project
cd <frontend-project-folder>

2. Install Dependencies
npm install

3. Configure Environment
- Edit src/environments/environment.ts:
export const environment = {
production: false,
apiBaseUrl: 'https://localhost:5001/api' // Update to match your API URL
};

4. Run the Angular App
ng serve
- Default URL: http://localhost:4200

---

### Testing the Integration

- Open a browser and navigate to http://localhost:4200
- Check if the Angular app successfully fetches data from the API.
- Use browser developer tools to inspect network requests and debug.

---

### Troubleshooting

- CORS Errors: Enable CORS in .NET API to accept requests from Angular's origin.
- Port Conflicts: Change default ports in launchSettings.json or Angular's angular.json.
- HTTPS Certificate Warnings: Run this command to trust the local certificate:
dotnet dev-certs https --trust

---

### Deployment on Linux Using Docker

To deploy both the .NET 8 API and Angular frontend using Docker on a Linux environment:

1. Ensure Docker is Installed on Linux
sudo apt update
sudo apt install docker.io
sudo systemctl enable --now docker

2. Build the Docker Images
- Navigate to each project folder and build the images using your Dockerfile:
# For .NET Backend
cd <backend-project-folder>
docker build -t my-dotnet-api .

# For Angular Frontend
cd <frontend-project-folder>
docker build -t my-angular-app .

3. Run the Containers
# Run backend container
docker run -d -p 5000:80 --name dotnet-api my-dotnet-api

# Run frontend container
docker run -d -p 4200:80 --name angular-app my-angular-app

4. Access the Applications
- Angular app: http://<linux-host-ip>:4200
- .NET API: http://<linux-host-ip>:5000

5. Optional: Use Docker Compose
- Create a docker-compose.yml to manage both services:
version: '3'
services:
api:
build: ./backend
ports:
- "5000:80"

frontend:
build: ./frontend
ports:
- "4200:80"
- Run:
docker-compose up -d


End of Document.
