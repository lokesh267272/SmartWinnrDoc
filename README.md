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

### Images
<img width="1911" height="890" alt="image" src="https://github.com/user-attachments/assets/18b37b01-6676-4ffc-a1f9-3d21d910f9ea" />

<img width="1910" height="901" alt="image" src="https://github.com/user-attachments/assets/5f5145fe-cefc-483b-ad81-959b3b2f3968" />



<img width="1868" height="914" alt="Screenshot 2026-01-22 161647" src="https://github.com/user-attachments/assets/197ca8a0-0551-4a18-ab70-933c2e9e6e9e" />

<img width="1900" height="920" alt="Screenshot 2026-01-22 161810" src="https://github.com/user-attachments/assets/4db54de1-225f-4e0b-94f3-b1d80391fc1c" />

<img width="1914" height="886" alt="Screenshot 2026-01-22 161828" src="https://github.com/user-attachments/assets/f9d97a64-4c02-4bc7-a981-1229fc562d04" />

<img width="296" height="914" alt="Screenshot 2026-01-22 161845" src="https://github.com/user-attachments/assets/5b87531b-b74a-451d-86a5-4dc69b05cb12" />

