"""
Kaaval AI - Scam Detection Patterns Database
Comprehensive database of scam patterns, keywords, and indicators
"""

from typing import Dict, List
import re

# Phishing Keywords (multi-language support can be added)
PHISHING_KEYWORDS = [
    # Urgency and Threats
    "urgent", "immediately", "act now", "limited time", "expires today",
    "verify now", "suspend", "locked", "blocked", "unauthorized",
    "confirm identity", "update required", "action required",
    
    # Financial Lures
    "prize", "winner", "lottery", "congratulations", "refund",
    "cashback", "reward", "bonus", "free money", "claim now",
    "tax refund", "government grant", "compensation",
    
    # Credential Harvesting
    "verify account", "confirm password", "update payment",
    "billing problem", "payment failed", "reactivate",
    "click here", "click below", "verify here",
    
    # Impersonation
    "we are from", "customer support", "technical support",
    "security team", "fraud department", "verification team",
    
    # Generic Scam Indicators
    "dear customer", "dear user", "valued customer",
    "click link", "download attachment", "open file",
]

# UPI and Payment Scam Patterns
UPI_SCAM_PATTERNS = {
    "fake_refund": {
        "keywords": ["refund", "payment reversed", "amount credited", "verify upi"],
        "indicators": ["collect request", "enter upi pin", "verify transaction"],
        "severity": "high",
        "description": "Fake refund scam requesting UPI PIN or collect request"
    },
    "qr_code_scam": {
        "keywords": ["scan qr", "qr code", "quick payment"],
        "indicators": ["payment instead of receive", "unexpected amount"],
        "severity": "high",
        "description": "Malicious QR code that requests payment instead of sending"
    },
    "wrong_transfer": {
        "keywords": ["wrong transfer", "sent by mistake", "return money"],
        "indicators": ["urgent return", "please send back"],
        "severity": "medium",
        "description": "Scammer claims accidental transfer and asks for return"
    },
    "kyc_verification": {
        "keywords": ["kyc", "verify account", "update kyc", "block account"],
        "indicators": ["link to verify", "send otp", "share details"],
        "severity": "high",
        "description": "Fake KYC verification to steal banking credentials"
    }
}

# OTP Scam Patterns
OTP_SCAM_INDICATORS = [
    "share otp",
    "send otp",
    "tell me the code",
    "provide verification code",
    "otp received",
    "what is the otp",
    "read otp aloud",
    "customer care needs otp",
    "delivery needs otp",
]

# Suspicious URL Patterns
SUSPICIOUS_URL_PATTERNS = [
    # Shortened URLs
    r'bit\.ly',
    r'tinyurl\.com',
    r'goo\.gl',
    r'ow\.ly',
    r't\.co',
    
    # Suspicious TLDs
    r'\.tk$',
    r'\.ml$',
    r'\.ga$',
    r'\.cf$',
    r'\.gq$',
    
    # IP addresses in URLs
    r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}',
    
    # Typosquatting patterns (common misspellings)
    r'g00gle',
    r'paypa1',
    r'amazom',
    r'faceb00k',
    
    # Suspicious keywords in URL
    r'verify',
    r'account',
    r'secure',
    r'update',
    r'confirm',
    r'login',
]

# Email/Domain Spoofing Indicators
SPOOFING_INDICATORS = {
    "look_alike_domains": [
        "similar to legitimate but with extra characters",
        "uses numbers instead of letters (e.g., 'paypa1' instead of 'paypal')",
        "adds hyphens or extra words (e.g., 'secure-amazon.com')",
        "uses different TLDs (e.g., '.co' instead of '.com')"
    ],
    "sender_mismatch": [
        "display name doesn't match email address",
        "legitimate company name with suspicious domain",
        "generic sender names (noreply, admin, support)"
    ]
}

# Social Engineering Tactics
SOCIAL_ENGINEERING_TACTICS = {
    "authority": ["police", "government", "tax department", "legal notice"],
    "fear": ["arrest warrant", "legal action", "account suspended", "fraud detected"],
    "urgency": ["within 24 hours", "immediate action", "before midnight", "last chance"],
    "greed": ["exclusive offer", "limited slots", "100% profit", "risk-free"],
    "curiosity": ["you won't believe", "shocking news", "see who viewed your profile"],
}

# Transaction Scam Patterns
TRANSACTION_SCAM_PATTERNS = {
    "overpayment": {
        "description": "Scammer sends more than required and asks for refund",
        "keywords": ["sent extra", "refund difference", "wire back"],
        "severity": "high"
    },
    "advance_fee": {
        "description": "Requesting payment before delivering service/product",
        "keywords": ["processing fee", "advance payment", "security deposit"],
        "severity": "medium"
    },
    "fake_invoice": {
        "description": "Fraudulent invoice for services never ordered",
        "keywords": ["payment overdue", "invoice attached", "account payable"],
        "severity": "medium"
    }
}


def calculate_pattern_score(text: str) -> Dict[str, any]:
    """
    Calculate risk score based on pattern matching
    
    Args:
        text: Input text to analyze
        
    Returns:
        Dictionary with score and matched patterns
    """
    text_lower = text.lower()
    score = 0
    matched_patterns = []
    
    # Check phishing keywords
    phishing_matches = [kw for kw in PHISHING_KEYWORDS if kw in text_lower]
    if phishing_matches:
        score += len(phishing_matches) * 5
        matched_patterns.append({
            "type": "phishing_keywords",
            "matches": phishing_matches[:5],  # Limit to 5
            "severity": "medium"
        })
    
    # Check UPI patterns
    for pattern_name, pattern_data in UPI_SCAM_PATTERNS.items():
        keyword_matches = [kw for kw in pattern_data["keywords"] if kw in text_lower]
        if keyword_matches:
            score += 15
            matched_patterns.append({
                "type": "upi_scam",
                "pattern": pattern_name,
                "description": pattern_data["description"],
                "severity": pattern_data["severity"]
            })
    
    # Check OTP indicators
    otp_matches = [ind for ind in OTP_SCAM_INDICATORS if ind in text_lower]
    if otp_matches:
        score += 20
        matched_patterns.append({
            "type": "otp_sharing",
            "matches": otp_matches,
            "severity": "high"
        })
    
    # Check social engineering tactics
    for tactic, keywords in SOCIAL_ENGINEERING_TACTICS.items():
        tactic_matches = [kw for kw in keywords if kw in text_lower]
        if tactic_matches:
            score += 10
            matched_patterns.append({
                "type": "social_engineering",
                "tactic": tactic,
                "matches": tactic_matches,
                "severity": "medium"
            })
    
    return {
        "score": min(score, 100),  # Cap at 100
        "patterns": matched_patterns
    }


def analyze_url(url: str) -> Dict[str, any]:
    """
    Analyze URL for suspicious patterns
    
    Args:
        url: URL to analyze
        
    Returns:
        Dictionary with risk assessment
    """
    risk_score = 0
    indicators = []
    
    url_lower = url.lower()
    
    # Check for suspicious patterns
    for pattern in SUSPICIOUS_URL_PATTERNS:
        if re.search(pattern, url_lower):
            risk_score += 15
            indicators.append(f"Suspicious pattern: {pattern}")
    
    # Check for HTTPS
    if not url_lower.startswith('https://'):
        risk_score += 10
        indicators.append("Not using secure HTTPS protocol")
    
    # Check URL length (very long URLs can be suspicious)
    if len(url) > 100:
        risk_score += 5
        indicators.append("Unusually long URL")
    
    # Check for special characters
    special_char_count = sum(1 for c in url if c in '@!#$%^&*')
    if special_char_count > 3:
        risk_score += 10
        indicators.append("Excessive special characters")
    
    return {
        "score": min(risk_score, 100),
        "indicators": indicators
    }
