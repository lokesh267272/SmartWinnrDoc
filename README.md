# Document Management System

## Tech Stack
- Node.js v18+ 
- Angular v21.1.0
- MongoDB (Mongoose v9.1.5)
- Express.js v5.2.1

## Features
- User authentication with JWT
- Document upload and tagging
- Search and filter documents
- Role-based permission management (Admin, Editor, Viewer)
- Version control for documents
- User management

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm

### Backend Setup
1. Navigate to `server` folder
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and update the values:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/my-angular-app
   JWT_SECRET=your-secret-key
   ```
4. Start MongoDB (if using local)
5. Run server: `node index.js`

### Frontend Setup
1. Navigate to `smartWinnrDoc` folder
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` (optional, defaults to localhost:5000)
4. Run application: `npm start` or `ng serve`
5. Open browser at `http://localhost:4200`


## Environment Variables
Environment variables are not pushed to GitHub. A `.env.example` file is provided in the repository for local setup.

- Backend: Create `server/.env` from `server/.env.example`
- Frontend: Create `smartWinnrDoc/.env` from `smartWinnrDoc/.env.example`

## Default Ports
- Frontend: `http://localhost:4200`
- Backend API: `http://localhost:5000`
