# CyberGuardian.AI – Hands-On Scam Simulation Lab

<div align="center">

![CyberGuardian.AI](https://img.shields.io/badge/CyberGuardian.AI-v2.0-06b6d4?style=for-the-badge)
![TryHackMe Style](https://img.shields.io/badge/Style-TryHackMe-10b981?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)

**A TryHackMe-style, hands-on cybersecurity training platform for scam awareness.**

*Experience real scams in a safe environment. Learn by making mistakes.*

</div>

---

## 🎯 What is This?

CyberGuardian.AI is **NOT a quiz**. It's an interactive simulation lab where users are placed inside realistic scam environments and allowed to freely interact. The system silently tracks all actions, and feedback is given **only after the simulation ends** in a comprehensive debrief.

### Philosophy

- 🚫 No multiple-choice questions
- 🚫 No instant "safe/unsafe" popups
- ✅ Users explore, click, and make mistakes
- ✅ System silently tracks actions
- ✅ Learning happens in the final debrief

---

## 🧪 Available Labs

### 1. 📧 Phishing Email Lab
Navigate a realistic email inbox containing both safe and phishing emails. Can you spot the fake bank KYC email before entering your credentials on the fake login page?

**Features:**
- Gmail-style inbox UI with multiple emails
- Hoverable links showing real URLs in status bar
- Sender inspection with email header details
- Fake bank login page popup
- Report phishing functionality

### 2. 🛒 Fake Shopping Website Lab
Browse a too-good-to-be-true e-commerce site with 90% discounts. Will you spot the signs of a scam before entering your card details?

**Features:**
- Full browser chrome simulation (address bar, padlock, tabs)
- Product pages with fake 5-star reviews
- Urgency countdown timer
- Checkout page with card entry form
- URL/certificate inspection modal

### 3. 💳 UPI/QR Scam Lab (India-Focused)
Experience a WhatsApp conversation where a "customer support" agent sends you a QR code to "receive" a refund. This is one of India's most common scams.

**Features:**
- WhatsApp-style chat with typing indicators
- Scammer messages with pressure tactics
- QR code scanner simulation
- UPI payment approval screen showing "You are PAYING"
- The critical moment where you realize the trap

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS (custom cyber theme) |
| Routing | React Router v6 |
| State | React Context API |
| Backend | Node.js + Express |
| Data | JSON-based lab definitions |

---

## 📦 Project Structure

```
D:\simulator
├── backend/
│   ├── server.js              # Express API server
│   ├── package.json
│   └── data/
│       ├── scenarios.json     # Legacy quiz data
│       └── labs/
│           ├── labs-index.json
│           ├── phishing-email-lab.json
│           ├── fake-website-lab.json
│           └── upi-qr-lab.json
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.cjs
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css           # Premium cyber theme
        ├── components/
        │   └── Layout.jsx
        ├── context/
        │   └── SimulationContext.jsx
        ├── labs/
        │   ├── SimulationLabContext.jsx
        │   ├── PhishingEmailLabView.jsx
        │   ├── FakeWebsiteLabView.jsx
        │   └── UpiQrLabView.jsx
        └── pages/
            ├── LandingPage.jsx
            ├── LabListPage.jsx
            ├── LabRunnerPage.jsx
            └── LabDebriefPage.jsx
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Windows PowerShell or any terminal

### 1. Start the Backend

```bash
cd D:\simulator\backend
npm install
npm run dev
```

The backend runs on `http://localhost:4000`

### 2. Start the Frontend

```bash
cd D:\simulator\frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`

### 3. Open in Browser

Navigate to `http://localhost:5173` and click **"Enter Simulation Lab"**

---

## 🎮 How It Works

### Simulation Flow

```
┌─────────────────┐
│  Choose a Lab   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Enter Lab      │
│  (Session Start)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Explore Freely │  ◄── Actions tracked silently
│  No hints shown │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Exit Lab       │
│  (Session End)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  View Debrief   │
│  • Timeline     │
│  • Risk Score   │
│  • Mistakes     │
│  • Prevention   │
└─────────────────┘
```

### Simulation Engine

The engine works in three phases:

1. **Environment Loading**: Lab definitions are loaded from JSON files
2. **Silent Tracking**: Every click, hover, and input is recorded with timestamps
3. **Debrief Generation**: Actions are evaluated against trap conditions to generate the report

### Action Tracking

Events tracked during simulation:
- `open-email` - Opening an email
- `hover-link` - Hovering over a link
- `click-link` - Clicking a link
- `inspect-sender` - Checking email sender details
- `submit-login` - Entering credentials
- `click-buy-now` - Clicking buy button
- `submit-card` - Submitting payment form
- `scan-qr` - Scanning QR code
- `approve-upi` / `decline-upi` - UPI payment actions
- `report-email` - Reporting suspicious content

---

## 📊 Debrief Engine

After exiting a simulation, users see a comprehensive report:

### Risk Score (0-100)
- **0-19**: Safe - Excellent scam awareness
- **20-39**: Cautious - Avoided most traps
- **40-69**: Risky - Showed some caution but engaged with risky elements
- **70-100**: Dangerous - Fell for multiple traps

### Report Sections
1. **Action Timeline**: Chronological list of all actions with timestamps
2. **Mistakes Made**: Each risky action with severity and explanation
3. **Red Flags Missed**: Prevention actions not taken
4. **Real-World Consequences**: What would have happened in reality
5. **Prevention Tips**: How to protect yourself
6. **Learning Summary**: Key takeaway based on performance

---

## 🔧 Customization

### Adding New Labs

1. Create a new JSON file in `backend/data/labs/`:

```json
{
  "id": "new-lab-id",
  "name": "New Lab Name",
  "type": "new-lab-type",
  "difficulty": "beginner",
  "summary": "Brief description",
  "environment": {
    // Lab-specific environment data
  },
  "traps": [
    {
      "id": "trap-id",
      "category": "trap-category",
      "description": "What happened",
      "severity": 30,
      "triggerEvents": [
        { "type": "event-type", "field": "value" }
      ]
    }
  ],
  "debrief": {
    "realWorldConsequences": [],
    "preventionTips": [],
    "redFlagHints": {}
  }
}
```

2. Add to `labs-index.json`:

```json
{ "id": "new-lab-id" }
```

3. Create a new React component in `frontend/src/labs/` to render the environment

4. Register in `LabRunnerPage.jsx`:

```jsx
if (currentLab.type === 'new-lab-type') View = NewLabView;
```

### Customizing the Theme

Edit `frontend/tailwind.config.cjs` to modify:
- Color palette
- Gradients
- Animations
- Shadows

Edit `frontend/src/index.css` to modify:
- Component styles
- Custom animations
- Browser chrome appearance

---

## 🔌 API Reference

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/labs` | List all labs |
| GET | `/api/labs/:labId` | Get lab definition |
| POST | `/api/labs/:labId/sessions` | Start new session |
| POST | `/api/sessions/:sessionId/events` | Log events |
| POST | `/api/sessions/:sessionId/complete` | End session & get debrief |

### Example: Starting a Session

```bash
curl -X POST http://localhost:4000/api/labs/phishing-email-lab/sessions
```

Response:
```json
{
  "sessionId": "abc123...",
  "lab": { /* lab definition */ }
}
```

### Example: Logging an Event

```bash
curl -X POST http://localhost:4000/api/sessions/abc123/events \
  -H "Content-Type: application/json" \
  -d '{"events": [{"type": "click-link", "payload": {"url": "..."}}]}'
```

---

## 🎨 Design Principles

### UI/UX Rules
- **Realism over features**: UIs should look like real apps
- **No gamified hints**: No "are you sure?" popups during simulation
- **Silent tracking**: Users shouldn't know they're being observed
- **Immersive experience**: Minimal meta-UI during simulation
- **Premium aesthetics**: Modern dark theme, glassmorphism, micro-animations

### Accessibility
- All interactive elements have focus states
- Color contrast meets WCAG AA standards
- Keyboard navigation supported

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Ideas for Contribution
- New scam scenarios (SMS, voice calls, etc.)
- Localization for other languages
- Accessibility improvements
- Mobile-responsive layouts
- Analytics dashboard

---

## ⚠️ Safety Note

This project is solely for **education and awareness**. 

- Never connect to real banking systems
- Never use real credentials in simulations
- Never send/receive actual money
- Keep all examples clearly labeled as simulations

---

## 📄 License

MIT License - See LICENSE file for details.

---

<div align="center">

**Built for digital safety & awareness**

*Learn scams here, not the hard way.*

🛡️ CyberGuardian.AI

</div>
