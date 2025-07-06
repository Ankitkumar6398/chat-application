# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas (cloud database) for your chat application.

## Prerequisites
- A MongoDB Atlas account (free tier available)
- Node.js and npm installed

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" and create an account
3. Choose the "Free" tier (M0) for development

## Step 2: Create a Cluster

1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region close to your location
5. Click "Create"

## Step 3: Set Up Database Access

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

## Step 4: Set Up Network Access

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Your Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<database>` with your desired database name (e.g., "chatApp")

## Step 6: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://yourusername:yourpassword@yourcluster.mongodb.net/chatApp?retryWrites=true&w=majority

# JWT Secret
SECRET=your_super_secret_jwt_key_here

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

## Step 7: Test the Connection

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

4. You should see:
   ```
   ✅ MongoDB Connected Successfully!
   📊 Database: chatApp
   🌐 Host: your-cluster.mongodb.net
   🚀 Server running on port 8080
   ```

## Step 8: Verify in MongoDB Atlas

1. Go back to MongoDB Atlas
2. Click "Browse Collections" in your cluster
3. You should see your database and collections created automatically when you use the app

## Troubleshooting

### Connection Issues
- Verify your IP address is whitelisted in Network Access
- Check that your username and password are correct
- Ensure the connection string format is correct

### Authentication Errors
- Make sure your database user has the correct permissions
- Verify the password doesn't contain special characters that need URL encoding

### Network Issues
- Check if your firewall is blocking the connection
- Try connecting from a different network

## Security Best Practices

1. **Never commit your `.env` file** to version control
2. Use strong, unique passwords for database users
3. Restrict IP access to only necessary addresses in production
4. Use environment-specific connection strings
5. Regularly rotate your JWT secret

## Production Considerations

1. Use a paid MongoDB Atlas tier for production
2. Set up proper backup strategies
3. Configure monitoring and alerts
4. Use VPC peering for enhanced security
5. Set up proper indexes for performance

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `PORT` | Server port | `8080` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `SECRET` | JWT signing secret | `your_secret_key` |
| `FRONTEND_URL` | Frontend application URL | `http://localhost:3000` |

## Migration from Local MongoDB

If you're migrating from a local MongoDB instance:

1. Export your data from local MongoDB:
   ```bash
   mongodump --db myDatabase --out ./backup
   ```

2. Import to MongoDB Atlas:
   ```bash
   mongorestore --uri "mongodb+srv://user:pass@cluster.mongodb.net/chatApp" ./backup/myDatabase
   ```

3. Update your connection string in the `.env` file
4. Test the application thoroughly

## Support

If you encounter issues:
1. Check MongoDB Atlas documentation
2. Verify your connection string format
3. Check the server logs for detailed error messages
4. Ensure all environment variables are properly set 