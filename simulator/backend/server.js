const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ------------------------------
// Legacy quiz-style scenarios (still exposed for now)
// ------------------------------
const dataPath = path.join(__dirname, 'data', 'scenarios.json');
let scenarios = [];

function loadScenarios() {
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    scenarios = JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load scenarios.json', err);
    scenarios = [];
  }
}

loadScenarios();

// ------------------------------
// Hands-on lab definitions and session engine
// ------------------------------
const labsDir = path.join(__dirname, 'data', 'labs');
const labsIndexPath = path.join(labsDir, 'labs-index.json');
let labsIndex = [];
let labsById = new Map();

function loadLabs() {
  try {
    const rawIndex = fs.readFileSync(labsIndexPath, 'utf-8');
    labsIndex = JSON.parse(rawIndex);
  } catch (err) {
    console.error('Failed to load labs-index.json', err);
    labsIndex = [];
  }

  labsById = new Map();
  labsIndex.forEach((labMeta) => {
    const fullPath = path.join(labsDir, `${labMeta.id}.json`);
    try {
      const rawLab = fs.readFileSync(fullPath, 'utf-8');
      const lab = JSON.parse(rawLab);
      labsById.set(lab.id, lab);
    } catch (err) {
      console.error(`Failed to load lab definition for ${labMeta.id}`, err);
    }
  });
}

loadLabs();

// In-memory session store
const sessions = new Map();

function createSessionId() {
  return crypto.randomBytes(12).toString('hex');
}

// Enhanced event labeling for timeline display
function getEventLabel(event) {
  const type = event.type;
  const payload = event.payload || {};

  switch (type) {
    case 'view-inbox':
      return `Opened email inbox (${payload.emailCount || 0} emails)`;
    case 'open-email':
      return `Opened email: "${payload.messageId}"`;
    case 'hover-link':
      return `Hovered over link: ${payload.url}`;
    case 'click-link':
      return `Clicked link: ${payload.url}`;
    case 'inspect-sender':
      return `Inspected sender: ${payload.fromAddress}`;
    case 'inspect-url':
      return `Inspected URL/certificate: ${payload.url}`;
    case 'report-email':
      return `Reported email as phishing`;
    case 'submit-login':
      return `Entered credentials on login page`;
    case 'view-product':
      return `Viewed product details`;
    case 'add-to-cart':
      return `Added item to cart`;
    case 'click-buy-now':
      return `Clicked "Buy Now" button`;
    case 'start-checkout':
      return `Started checkout process`;
    case 'submit-card':
      return `Submitted card payment details`;
    case 'send-chat':
      return `Sent chat message: "${payload.text}"`;
    case 'scan-qr':
      return `Scanned QR code (₹${payload.amount})`;
    case 'approve-upi':
      return `Approved UPI payment (₹${payload.amount})`;
    case 'decline-upi':
      return `Declined UPI payment`;
    case 'exit-chat':
      return `Exited chat conversation`;
    default:
      return type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
}

function evaluateSession(lab, session) {
  const events = session.events || [];
  const triggeredTrapIds = new Set();

  // Helper: check if all patterns in triggerEvents appear in the event stream.
  function matchesTrigger(trigger) {
    if (trigger.type === 'derived') {
      // Derived rules for complex conditions
      if (trigger.rule === 'clicked-phishing-link-without-any-inspect') {
        const clicked = events.find(
          (e) => e.type === 'click-link' && e.payload && e.payload.messageId === 'bank-kyc-phish'
        );
        if (!clicked) return false;
        const inspected = events.find((e) => e.type === 'inspect-sender' || e.type === 'inspect-url');
        return !inspected;
      }
      if (trigger.rule === 'no-inspect-url-before-submit-card') {
        const submit = events.find((e) => e.type === 'submit-card');
        if (!submit) return false;
        const inspect = events.find((e) => e.type === 'inspect-url');
        return !inspect;
      }
      return false;
    }

    // Non-derived triggers: match event type and payload fields
    return events.some((e) => {
      if (e.type !== trigger.type) return false;

      // All specified fields on trigger must match payload
      const keys = Object.keys(trigger).filter((k) => k !== 'type');
      return keys.every((key) => {
        const expected = trigger[key];
        const actual = e.payload && Object.prototype.hasOwnProperty.call(e.payload, key)
          ? e.payload[key]
          : e[key];
        return actual === expected;
      });
    });
  }

  const mistakes = [];
  const missedRedFlags = [];
  const goodActions = [];
  let rawScore = 0;

  (lab.traps || []).forEach((trap) => {
    const anyTrigger = (trap.triggerEvents || []).some((t) => matchesTrigger(t));
    if (anyTrigger) {
      triggeredTrapIds.add(trap.id);
      rawScore += trap.severity || 0;

      if ((trap.severity || 0) > 0) {
        mistakes.push({
          trapId: trap.id,
          category: trap.category,
          description: trap.description,
          severity: trap.severity || 0,
        });
      } else if ((trap.severity || 0) < 0) {
        goodActions.push({
          trapId: trap.id,
          category: trap.category,
          description: trap.description,
          bonus: Math.abs(trap.severity || 0),
        });
      }
    } else {
      // Only add to missed red flags if it's a bad action they could have made
      // Don't add good actions to missed list
      if ((trap.severity || 0) > 0 && trap.category !== 'good-action') {
        // This is actually something they avoided - good!
      }
    }
  });

  // Calculate missed prevention opportunities (things they could have done)
  const preventionActions = (lab.traps || []).filter(t => (t.severity || 0) < 0);
  preventionActions.forEach((trap) => {
    if (!triggeredTrapIds.has(trap.id)) {
      missedRedFlags.push({
        trapId: trap.id,
        category: trap.category,
        description: trap.description,
      });
    }
  });

  // Convert rawScore into bounded riskScore 0–100
  const maxScore = 100;
  let riskScore = rawScore;
  if (riskScore < 0) riskScore = 0;
  if (riskScore > maxScore) riskScore = maxScore;

  let riskBand = 'Safe';
  if (riskScore >= 70) riskBand = 'Dangerous';
  else if (riskScore >= 40) riskBand = 'Risky';

  // Build timeline with enhanced labels
  const startedAt = session.startedAt || Date.now();
  const timeline = events
    .slice()
    .sort((a, b) => a.ts - b.ts)
    .map((e) => {
      const offsetSec = Math.max(0, Math.round(((e.ts || startedAt) - startedAt) / 1000));
      return {
        ts: e.ts,
        offsetSeconds: offsetSec,
        type: e.type,
        label: getEventLabel(e),
        payload: e.payload || {},
      };
    });

  // Generate learning summary
  let learningSummary = '';
  if (riskScore >= 70) {
    learningSummary = 'You fell for several traps in this simulation. This is a learning experience - review the red flags and prevention tips carefully.';
  } else if (riskScore >= 40) {
    learningSummary = 'You showed some caution but still engaged with risky elements. Focus on verifying before acting.';
  } else if (riskScore >= 20) {
    learningSummary = 'Good awareness! You avoided most traps but there is still room for improvement.';
  } else {
    learningSummary = 'Excellent scam awareness! You recognized the warning signs and protected yourself.';
  }

  return {
    riskScore,
    riskBand,
    mistakes,
    missedRedFlags,
    goodActions,
    timeline,
    learningSummary,
    realWorldConsequences: (lab.debrief && lab.debrief.realWorldConsequences) || [],
    preventionTips: (lab.debrief && lab.debrief.preventionTips) || [],
    redFlagHints: (lab.debrief && lab.debrief.redFlagHints) || {},
  };
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    name: 'CyberGuardian.AI Backend',
    version: '2.0.0',
    labs: labsIndex.length,
  });
});

// Legacy scenarios (quiz mode)
app.get('/api/scenarios', (req, res) => {
  const summary = scenarios.map(({ id, title, scamType, description, psychologyTriggers }) => ({
    id,
    title,
    scamType,
    description,
    psychologyTriggers,
  }));
  res.json(summary);
});

app.get('/api/scenarios/:id', (req, res) => {
  const scenario = scenarios.find((s) => s.id === req.params.id);
  if (!scenario) {
    return res.status(404).json({ message: 'Scenario not found' });
  }
  res.json(scenario);
});

// Hands-on labs APIs
app.get('/api/labs', (req, res) => {
  // Return labs with additional metadata from their definitions
  const labsWithMeta = labsIndex.map((meta) => {
    const lab = labsById.get(meta.id);
    return {
      ...meta,
      name: lab?.name || meta.id,
      summary: lab?.summary || '',
      difficulty: lab?.difficulty || 'beginner',
      type: lab?.type || 'unknown',
    };
  });
  res.json(labsWithMeta);
});

app.get('/api/labs/:labId', (req, res) => {
  const lab = labsById.get(req.params.labId);
  if (!lab) {
    return res.status(404).json({ message: 'Lab not found' });
  }
  res.json(lab);
});

app.post('/api/labs/:labId/sessions', (req, res) => {
  const labId = req.params.labId;
  const lab = labsById.get(labId);
  if (!lab) {
    return res.status(404).json({ message: 'Lab not found' });
  }

  const sessionId = createSessionId();
  const now = Date.now();
  const session = {
    id: sessionId,
    labId,
    startedAt: now,
    endedAt: null,
    events: [],
  };
  sessions.set(sessionId, session);

  console.log(`[Session] Started: ${sessionId} for lab: ${labId}`);

  res.status(201).json({ sessionId, lab });
});

app.post('/api/sessions/:sessionId/events', (req, res) => {
  const sessionId = req.params.sessionId;
  const session = sessions.get(sessionId);
  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }

  const { events } = req.body || {};
  if (!Array.isArray(events)) {
    return res.status(400).json({ message: 'events must be an array' });
  }

  const now = Date.now();
  events.forEach((ev) => {
    if (!ev || typeof ev.type !== 'string') return;
    const event = {
      type: ev.type,
      payload: ev.payload || {},
      ts: typeof ev.ts === 'number' ? ev.ts : now,
    };
    session.events.push(event);
    console.log(`[Event] ${sessionId}: ${ev.type}`);
  });

  res.status(204).end();
});

app.post('/api/sessions/:sessionId/complete', (req, res) => {
  const sessionId = req.params.sessionId;
  const session = sessions.get(sessionId);
  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }

  const lab = labsById.get(session.labId);
  if (!lab) {
    return res.status(500).json({ message: 'Lab definition missing for session' });
  }

  session.endedAt = Date.now();
  const debrief = evaluateSession(lab, session);

  console.log(`[Session] Completed: ${sessionId} | Risk Score: ${debrief.riskScore}`);

  res.json({
    sessionId,
    labId: session.labId,
    startedAt: session.startedAt,
    endedAt: session.endedAt,
    debrief,
  });
});

// Get session status (for debugging)
app.get('/api/sessions/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId;
  const session = sessions.get(sessionId);
  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }
  res.json({
    sessionId: session.id,
    labId: session.labId,
    startedAt: session.startedAt,
    endedAt: session.endedAt,
    eventCount: session.events.length,
  });
});

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🛡️  CyberGuardian.AI Backend                        ║
║                                                       ║
║   Server running on http://localhost:${PORT}            ║
║   Labs loaded: ${labsIndex.length}                                    ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});
