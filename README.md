# Dockerized React + Express + MongoDB App

A full-stack web application boilerplate using:

- **Frontend**: React, Redux, TanStack Query, SASS, RSPack
- **Backend**: Node.js, Express, MongoDB, JWT
- **Tooling**: ESLint, Prettier, Cypress
- **Containerization**: Docker & Docker Compose

---

## 📦 Project Structure

```
my-app/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
└── .env (optional)
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Node.js (if running locally)](https://nodejs.org)

### Running the App

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: mongodb://localhost:27017/mydb

---

## 🛠️ Features

### Frontend

- React 18 with JSX
- Redux Toolkit for state management
- TanStack Query for data fetching
- SCSS styling
- ESLint & Prettier for formatting
- RSPack bundler
- Cypress for end-to-end testing

### Backend

- Express server with REST API
- MongoDB using Mongoose
- JWT-based authentication
- Environment config via `.env`
- Nodemon for dev reload

---

## 🧪 Testing

Run Cypress UI:

```bash
docker exec -it <frontend-container> npx cypress open
```

Or headless:

```bash
docker exec -it <frontend-container> npx cypress run
```

---

## 📝 Environment Variables

Create a `.env` file for the backend:

```dotenv
MONGO_URI=mongodb://mongo:27017/mydb
JWT_SECRET=your_jwt_secret
```

---

## 📚 Scripts

Frontend:

```bash
npm run dev      # Start RSPack dev server
```

Backend:

```bash
npm run dev      # Start Express using Nodemon
```

---

## 📦 Build for Production

> To be configured: Add separate Dockerfiles or scripts for production optimization.

---

## 📄 License

MIT
