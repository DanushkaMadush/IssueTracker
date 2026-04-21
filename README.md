# IssueTracker

A full-stack issue tracking web application built with React, Express, TypeScript, and MongoDB Atlas.

## Overview

IssueTracker lets users register, log in, and manage software issues with status, priority, and severity tracking.

Core capabilities:
- User authentication with JWT
- Create, view, and update issues
- Filter and search issues
- Status-based issue statistics
- CSV export from the frontend

## Tech Stack

- Frontend: React 19, TypeScript, Vite 8, React Router 7, Axios, Framer Motion
- Backend: Express 5, TypeScript, Mongoose 9, JSON Web Tokens, bcryptjs
- Database: MongoDB Atlas
- Containerization: Docker, Docker Compose
- Deployment: AWS EC2 via GitHub Actions deploy workflow

## Project Structure

```text
IssueTracker/
|-- .github/
|   `-- workflows/
|       `-- deploy.yml
|-- backend/
|   |-- dockerfile
|   |-- package.json
|   |-- tsconfig.json
|   |-- .env _example
|   `-- src/
|       |-- app.ts
|       |-- server.ts
|       |-- config/
|       |-- controllers/
|       |   |-- auth.controller.ts
|       |   `-- issue.controller.ts
|       |-- middleware/
|       |   |-- auth.middleware.ts
|       |   `-- error.middleware.ts
|       |-- models/
|       |   |-- issue.model.ts
|       |   `-- user.model.ts
|       |-- routes/
|       |   |-- auth.routes.ts
|       |   `-- issue.routes.ts
|       |-- services/
|       |   |-- auth.service.ts
|       |   `-- issue.service.ts
|       `-- utils/
|-- frontend/
|   |-- dockerfile
|   |-- eslint.config.js
|   |-- index.html
|   |-- package.json
|   |-- README.md
|   |-- tsconfig.app.json
|   |-- tsconfig.json
|   |-- tsconfig.node.json
|   |-- vite.config.ts
|   |-- public/
|   `-- src/
|       |-- App.css
|       |-- App.tsx
|       |-- index.css
|       |-- main.tsx
|       |-- api/
|       |   |-- client.ts
|       |   |-- services/
|       |   |   |-- auth.service.ts
|       |   |   `-- issue.service.ts
|       |   `-- types/
|       |       |-- auth.types.ts
|       |       `-- issue.types.ts
|       |-- assets/
|       |-- components/
|       |   |-- Button.tsx
|       |   |-- Card.tsx
|       |   |-- FloatingButton.tsx
|       |   |-- IssueCard.tsx
|       |   |-- IssueDetailsModal.tsx
|       |   |-- IssueForm.tsx
|       |   |-- IssuesSection.tsx
|       |   |-- Modal.tsx
|       |   |-- PaginationArrows.tsx
|       |   |-- StatsCard.tsx
|       |   `-- StatsSection.tsx
|       |-- pages/
|       |   |-- HomePage.tsx
|       |   |-- LoginPage.tsx
|       |   `-- RegisterPage.tsx
|       |-- routes/
|       |   `-- AppRoutes.tsx
|       |-- theme/
|       |   |-- color.mappings.ts
|       |   `-- colors.ts
|       `-- utility/
|           `-- exportIssues.ts
|-- docker-compose.yml
`-- README.md
```

## Prerequisites

- Node.js 20+
- npm
- Docker and Docker Compose
- MongoDB Atlas cluster

## Environment Variables

Backend uses `backend/.env`.

Current template file in this repo is named `backend/.env _example`.

Example values:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/issuetracker
JWT_SECRET=<your-strong-secret>
```

Root `.env` is used by Docker Compose to pass frontend build arg:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## Local Development

1. Install backend dependencies and start backend:

```bash
cd backend
npm install
cp ".env _example" .env
npm run dev
```

2. In a second terminal, install frontend dependencies and start frontend:

```bash
cd frontend
npm install
npm run dev
```

Local URLs:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Docker

From repository root:

```bash
docker compose up --build
```

Services:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

Notes:
- Backend loads env vars from `./backend/.env`
- Frontend receives `VITE_API_BASE_URL` as a build arg

## Available Scripts

Backend (`cd backend`):
- `npm run dev`: start with hot reload
- `npm run build`: compile TypeScript to `dist/`
- `npm run start`: run compiled server

Frontend (`cd frontend`):
- `npm run dev`: start Vite development server
- `npm run build`: type check and build production bundle
- `npm run lint`: run ESLint
- `npm run preview`: preview production build

## API Endpoints

Base path: `/api/v1`

Authentication:
- `POST /auth/register`: register a user
- `POST /auth/login`: login and get JWT token

Issues (requires `Authorization: Bearer <token>`):
- `POST /issues`: create issue
- `GET /issues`: list issues with query params `page`, `limit`, `status`, `priority`, `search`
- `GET /issues/stats`: get issue counts by status
- `GET /issues/:id`: get one issue
- `PUT /issues/:id`: update issue
- `PATCH /issues/:id/status`: update issue status

Health:
- `GET /`: returns API status message

## Data Model

User:
- `email` (required, unique)
- `password` (required, hashed)

Issue:
- `title` (required, 3-100 chars)
- `description` (required, min 5 chars)
- `status` (`Open`, `In Progress`, `Resolved`, `Closed`)
- `priority` (`Low`, `Medium`, `High`)
- `severity` (`Minor`, `Major`, `Critical`)
- `createdBy` (User reference)
- `createdAt`, `updatedAt` timestamps

Indexes on issues:
- Text index on `title` and `description`
- Index on `status`
- Index on `priority`
- Index on `createdAt` (descending)

## CI/CD

Current workflow files:
- `.github/workflows/deploy.yml` exists and deploys to EC2 on push to `main`
- No CI workflow file is currently present

Required GitHub secrets for deploy workflow:
- `EC2_HOST`
- `EC2_USER`
- `EC2_SSH_KEY`

## Troubleshooting

- `JWT_SECRET is not defined`:
  - Ensure `backend/.env` exists and contains `JWT_SECRET`
- MongoDB connection errors:
  - Verify `MONGO_URI` and Atlas network access
- Frontend cannot reach backend:
  - Check `VITE_API_BASE_URL` and rebuild frontend image if using Docker
- Docker command issues:
  - Use `docker compose` (Compose v2)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request to `main`
