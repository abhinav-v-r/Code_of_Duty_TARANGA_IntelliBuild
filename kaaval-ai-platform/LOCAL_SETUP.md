# Kaaval AI - Local Development Guide

## 🚀 Quick Start (3 Steps)

### Step 1: Run Setup (One Time Only)
Open PowerShell in the project directory and run:
```powershell
.\setup-local.ps1
```

This will:
- Check Node.js and Python installations
- Install all frontend dependencies
- Create Python virtual environment
- Install backend dependencies
- Create environment configuration files

### Step 2: Start the Application
```powershell
.\start-local.ps1
```

This opens two terminal windows:
1. **Backend API** (port 8000)
2. **Frontend** (port 3000)

### Step 3: Open Your Browser
- **Application**: http://localhost:3000
- **API Documentation**: http://localhost:8000/api/docs

---

## 📋 Manual Setup (Alternative)

If scripts don't work, follow these manual steps:

### Frontend Setup
```powershell
cd frontend
npm install

# Create .env.local file with:
# NEXT_PUBLIC_API_URL=http://localhost:8000
# NEXT_PUBLIC_ENABLE_MOCK_API=true

npm run dev
```

### Backend Setup (New Terminal)
```powershell
cd backend/ai-service
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Create .env file with:
# ENVIRONMENT=development
# API_PORT=8000
# CORS_ORIGINS=http://localhost:3000

python main.py
```

---

## ✅ Verification

After starting:

1. **Backend Health Check**
   - Open: http://localhost:8000/api/health
   - Should see: `{"status": "healthy"}`

2. **API Documentation**
   - Open: http://localhost:8000/api/docs
   - Should see interactive Swagger UI

3. **Frontend**
   - Open: http://localhost:3000
   - Should see the Kaaval AI homepage

---

## 🧪 Test the Platform

Try analyzing this sample scam:

```
URGENT! Your bank account will be blocked.
Click here: bit.ly/secure123
Share your OTP to verify.
```

1. Go to http://localhost:3000
2. Scroll to "Analyze Suspicious Content"
3. Paste the text
4. Click "Analyze Now"
5. See real-time AI detection results!

---

## ⚠️ Troubleshooting

### Port Already in Use

**Backend (8000)**:
```powershell
# Find process using port 8000
netstat -ano | findstr :8000
# Kill the process (replace PID)
taskkill /PID <PID> /F
```

**Frontend (3000)**:
```powershell
# Find process using port 3000
netstat -ano | findstr :3000
# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Module Not Found Errors

**Frontend**:
```powershell
cd frontend
rm -r node_modules
npm install
```

**Backend**:
```powershell
cd backend/ai-service
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### CORS Errors
Make sure `.env.local` in frontend has:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Python Virtual Environment Issues
```powershell
cd backend/ai-service
rm -r venv
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

---

## 🛑 Stopping the Application

Press **Ctrl+C** in each terminal window to stop the servers.

---

## 📦 Without Mock API (Real Backend Required)

To use real backend instead of mock data:

In `frontend/.env.local`:
```
NEXT_PUBLIC_ENABLE_MOCK_API=false
```

Restart frontend server.

---

## 🎯 Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload - changes apply automatically
2. **Console Logs**: Check browser console (F12) for frontend logs
3. **API Logs**: Check backend terminal for API request logs
4. **Database**: Not required for basic functionality (uses in-memory)

---

## 📞 Need Help?

- Check the main [README.md](README.md) for detailed documentation
- View [QUICKSTART.md](QUICKSTART.md) for Docker deployment
- Check API docs at http://localhost:8000/api/docs

---

**Happy Coding! 🛡️**
