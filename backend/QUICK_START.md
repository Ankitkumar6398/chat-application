# Quick Start Guide - MongoDB Atlas Setup

## 🚀 Quick Setup (5 minutes)

### 1. Get MongoDB Atlas Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (FREE tier)
4. Add a database user (username + password)
5. Allow access from anywhere (0.0.0.0/0)
6. Get your connection string from "Connect" button

### 2. Run Setup Script

```bash
cd backend
npm run setup
```

Follow the prompts to enter your MongoDB Atlas connection string.

### 3. Start the Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully!
📊 Database: chatApp
🌐 Host: your-cluster.mongodb.net
🚀 Server running on port 8080
```

## 🔧 Manual Setup

If you prefer to set up manually:

1. Create a `.env` file in the `backend` directory
2. Add your MongoDB Atlas connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatApp?retryWrites=true&w=majority
PORT=8080
NODE_ENV=development
SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
```

## ✅ Verification

1. Check server logs for successful connection
2. Visit `http://localhost:8080/health` in your browser
3. You should see a JSON response with status "OK"

## 🆘 Troubleshooting

- **Connection failed**: Check your connection string and network access
- **Authentication error**: Verify username/password
- **Network error**: Ensure IP is whitelisted in MongoDB Atlas

## 📖 Full Documentation

See `MONGODB_ATLAS_SETUP.md` for detailed instructions. 