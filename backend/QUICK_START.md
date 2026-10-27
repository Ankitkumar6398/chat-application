# Quick Start

## 1. MongoDB

**Local:** MongoDB install karke chalao — default URI `.env.example` mein hai.

**Atlas:** [MongoDB Atlas](https://www.mongodb.com/atlas) par free cluster banao, user + network access set karo, connection string copy karo.

## 2. Environment

```bash
cd backend
copy .env.example .env
cd ../frontend
copy .env.example .env
```

`backend/.env` kholo aur apna `MONGODB_URI` aur strong `SECRET` daalo. Frontend mein usually default `REACT_APP_API_URL=http://localhost:8080` theek hai.

## 3. Run

```bash
cd backend
npm install
npm run dev
```

Alag terminal:

```bash
cd frontend
npm install
npm start
```

Health check: [http://localhost:8080/health](http://localhost:8080/health)

Atlas detail: `MONGODB_ATLAS_SETUP.md`
