# Quick Start Guide

## Prerequisites
- Node.js 18+
- Python 3.11+
- npm or yarn

## Running the Application

### 1. Start Backend (Terminal 1)
```bash
cd backend/ai-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### 2. Start Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```

### 3. Access the Platform
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:8000/api/docs

## Test the Platform

1. Navigate to the Scam Analyzer section
2. Try these sample scam texts:

**High Risk Example:**
```
URGENT! Your bank account will be blocked in 24 hours. 
Click here to verify: bit.ly/verify123
Share OTP to confirm identity.
```

**UPI Scam Example:**
```
Congratulations! You have received a refund of ₹5000.
Scan this QR code to claim your amount.
Enter UPI PIN to verify.
```

3. Analyze a suspicious URL:
```
http://paypa1-secure-login.tk/verify
```

## Deployment with Docker

```bash
docker-compose up --build
```

All services start automatically!

---

For detailed documentation, see [README.md](README.md)
