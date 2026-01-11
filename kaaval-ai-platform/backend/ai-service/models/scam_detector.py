"""
Kaaval AI - Scam Detection ML Model
AI-powered scam classification using Google Gemini and pattern matching
"""

from typing import Dict, List
import re
import os
import json
from datetime import datetime

# Google Gemini AI
import google.generativeai as genai

from utils.patterns import (
    calculate_pattern_score,
    analyze_url,
    PHISHING_KEYWORDS,
    UPI_SCAM_PATTERNS,
    OTP_SCAM_INDICATORS
)


class ScamDetector:
    """
    Advanced scam detection engine combining:
    - Google Gemini AI for intelligent content analysis
    - Rule-based pattern matching
    - URL analysis
    - Risk scoring algorithm
    """
    
    def __init__(self):
        """Initialize the scam detector with Gemini AI"""
        self.gemini_available = False
        self.model = None
        
        # Try to initialize Gemini
        api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
        if api_key:
            try:
                genai.configure(api_key=api_key)
                self.model = genai.GenerativeModel('gemini-2.0-flash')
                self.gemini_available = True
                print("✅ Gemini AI initialized successfully")
            except Exception as e:
                print(f"⚠️ Gemini AI initialization failed: {e}")
                self.gemini_available = False
        else:
            print("⚠️ No Gemini API key found. Using pattern-based detection only.")
    
    async def analyze_with_gemini(self, content: str, content_type: str) -> Dict:
        """
        Use Gemini AI to analyze content for scam indicators
        
        Args:
            content: Text/URL to analyze
            content_type: Type of content
            
        Returns:
            AI analysis results
        """
        if not self.gemini_available:
            return None
        
        try:
            prompt = f"""You are an expert scam detection AI specialized in identifying fraud, phishing, and scam content.
            
Analyze the following {content_type} content and determine if it's a scam, phishing attempt, or fraudulent:

CONTENT TO ANALYZE:
---
{content}
---

Provide your analysis in the following JSON format ONLY (no other text):
{{
    "is_scam": true/false,
    "risk_score": 0-100,
    "risk_level": "low" | "medium" | "high",
    "confidence": 0.0-1.0,
    "scam_type": "phishing" | "kyc_fraud" | "prize_scam" | "upi_scam" | "job_scam" | "investment_scam" | "impersonation" | "social_engineering" | "not_a_scam",
    "indicators": [
        {{
            "type": "indicator_name",
            "description": "detailed description",
            "severity": "low" | "medium" | "high"
        }}
    ],
    "explanation": "Detailed explanation of why this is or is not a scam",
    "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
}}

Consider these scam indicators:
- Urgency/pressure tactics ("act now", "24 hours", "immediately")
- Requests for sensitive info (OTP, PIN, password, card details, Aadhaar, PAN)
- Prize/lottery claims
- Suspicious URLs (misspelled brands, unusual TLDs like .xyz, .top)
- Impersonation of banks, companies, or government
- KYC/account verification requests via SMS/email
- UPI/payment related scams
- Threatening language
- Too-good-to-be-true offers

Be thorough and accurate. Indian context scams are common (SBI, HDFC, Paytm, PhonePe, etc.)."""

            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            
            # Extract JSON from response
            # Handle markdown code blocks
            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0]
            elif "```" in response_text:
                response_text = response_text.split("```")[1].split("```")[0]
            
            result = json.loads(response_text.strip())
            return result
            
        except json.JSONDecodeError as e:
            print(f"⚠️ Failed to parse Gemini response: {e}")
            return None
        except Exception as e:
            print(f"⚠️ Gemini analysis error: {e}")
            return None
    
    def analyze_text(self, content: str, content_type: str = "text") -> Dict:
        """
        Analyze text content for scam indicators (sync wrapper)
        
        Args:
            content: Text to analyze
            content_type: Type of content (text, email, url, transaction)
            
        Returns:
            Comprehensive analysis results
        """
        import asyncio
        
        # Check if we're in an async context
        try:
            loop = asyncio.get_running_loop()
            # We're in an async context, use create_task
            # But since FastAPI handles this, just call the async version
            return asyncio.run(self._analyze_text_async(content, content_type))
        except RuntimeError:
            # No running loop, create one
            return asyncio.run(self._analyze_text_async(content, content_type))
    
    async def _analyze_text_async(self, content: str, content_type: str = "text") -> Dict:
        """
        Async text analysis combining Gemini AI and pattern matching
        """
        start_time = datetime.now()
        
        # Pattern-based analysis (always run as fallback/supplement)
        pattern_results = calculate_pattern_score(content)
        
        # Try Gemini AI analysis
        gemini_result = await self.analyze_with_gemini(content, content_type)
        
        if gemini_result and gemini_result.get("is_scam") is not None:
            # Use Gemini's analysis as primary
            risk_level = gemini_result.get("risk_level", "low")
            risk_score = gemini_result.get("risk_score", 0)
            confidence = gemini_result.get("confidence", 0.85)
            
            # Format indicators from Gemini
            indicators = []
            for ind in gemini_result.get("indicators", []):
                indicators.append({
                    "type": ind.get("type", "unknown"),
                    "description": ind.get("description", ""),
                    "severity": ind.get("severity", "medium"),
                    "confidence": confidence
                })
            
            # Add pattern-based indicators if Gemini missed any
            pattern_indicators = self._format_indicators(pattern_results["patterns"])
            for pi in pattern_indicators:
                if not any(i["type"] == pi["type"] for i in indicators):
                    indicators.append(pi)
            
            explanation = gemini_result.get("explanation", "AI analysis completed.")
            recommendations = gemini_result.get("recommendations", [])
            
            # Format scam type as pattern
            scam_type = gemini_result.get("scam_type", "unknown")
            patterns = []
            if scam_type != "not_a_scam":
                patterns.append({
                    "pattern": scam_type,
                    "category": self._get_category_for_type(scam_type),
                    "severity": risk_level,
                    "description": f"AI detected {scam_type.replace('_', ' ')} pattern"
                })
        else:
            # Fall back to pattern-based analysis
            combined_score = pattern_results["score"]
            
            # ML-based supplement
            ml_score = self._ml_classify(content)
            combined_score = (combined_score * 0.7) + (ml_score * 0.3)
            
            risk_level = self._calculate_risk_level(combined_score)
            risk_score = round(combined_score, 1)
            confidence = 0.75  # Lower confidence for pattern-only
            
            indicators = self._format_indicators(pattern_results["patterns"])
            patterns = self._format_patterns(pattern_results["patterns"])
            
            explanation = self._generate_explanation(
                pattern_results["patterns"],
                combined_score,
                risk_level
            )
            recommendations = self._generate_recommendations(risk_level, content_type)
        
        # Calculate processing time
        end_time = datetime.now()
        processing_time = int((end_time - start_time).total_seconds() * 1000)
        
        return {
            "riskLevel": risk_level,
            "riskScore": risk_score,
            "confidence": confidence,
            "indicators": indicators[:5],  # Limit to top 5
            "patterns": patterns[:3] if 'patterns' in dir() else [],
            "explanation": explanation,
            "recommendations": recommendations[:5],
            "processingTime": processing_time,
            "aiPowered": self.gemini_available and gemini_result is not None
        }
    
    def _get_category_for_type(self, scam_type: str) -> str:
        """Map scam type to category"""
        categories = {
            "phishing": "Phishing Attack",
            "kyc_fraud": "Banking Scam",
            "prize_scam": "Prize/Lottery Scam",
            "upi_scam": "UPI/Payment Scam",
            "job_scam": "Job/Employment Scam",
            "investment_scam": "Investment Fraud",
            "impersonation": "Impersonation Scam",
            "social_engineering": "Social Engineering",
            "not_a_scam": "Safe Content"
        }
        return categories.get(scam_type, "Unknown Scam Type")
    
    def analyze_url_content(self, url: str) -> Dict:
        """
        Analyze URL for malicious patterns
        
        Args:
            url: URL to analyze
            
        Returns:
            URL-specific analysis results
        """
        import asyncio
        
        try:
            loop = asyncio.get_running_loop()
            return asyncio.run(self._analyze_url_async(url))
        except RuntimeError:
            return asyncio.run(self._analyze_url_async(url))
    
    async def _analyze_url_async(self, url: str) -> Dict:
        """Async URL analysis"""
        start_time = datetime.now()
        
        # Pattern-based URL analysis
        url_analysis = analyze_url(url)
        
        # Try Gemini AI for URL analysis
        gemini_result = await self.analyze_with_gemini(url, "url")
        
        if gemini_result and gemini_result.get("is_scam") is not None:
            risk_level = gemini_result.get("risk_level", "low")
            risk_score = gemini_result.get("risk_score", 0)
            
            # Combine with pattern score
            combined_score = (risk_score * 0.6) + (url_analysis["score"] * 0.4)
            if combined_score > url_analysis["score"]:
                risk_score = combined_score
                risk_level = self._calculate_risk_level(combined_score)
            
            indicators = []
            for ind in gemini_result.get("indicators", []):
                indicators.append({
                    "type": "url_" + ind.get("type", "pattern"),
                    "description": ind.get("description", ""),
                    "severity": ind.get("severity", "medium"),
                    "confidence": gemini_result.get("confidence", 0.85)
                })
            
            explanation = gemini_result.get("explanation", "")
            recommendations = gemini_result.get("recommendations", [])
        else:
            risk_level = self._calculate_risk_level(url_analysis["score"])
            risk_score = url_analysis["score"]
            
            indicators = [
                {
                    "type": "url_pattern",
                    "description": indicator,
                    "severity": "high" if url_analysis["score"] > 50 else "medium",
                    "confidence": 0.8
                }
                for indicator in url_analysis["indicators"]
            ]
            
            explanation = f"URL analysis detected {len(url_analysis['indicators'])} suspicious patterns. "
            if risk_level == "high":
                explanation += "This URL exhibits multiple characteristics of phishing or malicious sites."
            elif risk_level == "medium":
                explanation += "This URL shows some concerning patterns that warrant caution."
            else:
                explanation += "This URL appears relatively safe, but always verify the source."
            
            recommendations = self._generate_recommendations(risk_level, "url")
        
        end_time = datetime.now()
        processing_time = int((end_time - start_time).total_seconds() * 1000)
        
        return {
            "riskLevel": risk_level,
            "riskScore": round(risk_score, 1),
            "confidence": 0.88,
            "indicators": indicators,
            "patterns": [],
            "explanation": explanation,
            "recommendations": recommendations,
            "processingTime": processing_time,
            "aiPowered": self.gemini_available and gemini_result is not None
        }
    
    def _ml_classify(self, text: str) -> float:
        """
        ML-based classification (pattern-based fallback)
        
        Args:
            text: Text to classify
            
        Returns:
            Risk score from 0-100
        """
        text_lower = text.lower()
        score = 0
        
        # Check for multiple exclamation marks or caps
        if text.count('!') > 2:
            score += 10
        
        caps_ratio = sum(1 for c in text if c.isupper()) / max(len(text), 1)
        if caps_ratio > 0.3:
            score += 15
        
        # Check for numbers (common in scam messages)
        if re.search(r'\d{10,}', text):
            score += 10
        
        # Check for currency symbols
        if any(symbol in text for symbol in ['$', '₹', '€', '£']):
            score += 5
        
        # Check for URLs
        if re.search(r'https?://|www\.', text_lower):
            score += 5
        
        # Check for personal info requests
        personal_info = ['password', 'pin', 'otp', 'cvv', 'card number', 'account number', 'aadhaar', 'pan']
        if any(info in text_lower for info in personal_info):
            score += 25
        
        return min(score, 100)
    
    def _calculate_risk_level(self, score: float) -> str:
        """Calculate risk level from score"""
        if score >= 60:
            return "high"
        elif score >= 30:
            return "medium"
        else:
            return "low"
    
    def _format_indicators(self, patterns: List[Dict]) -> List[Dict]:
        """Format pattern matches as risk indicators"""
        indicators = []
        
        for pattern in patterns[:5]:
            indicator_type = pattern.get("type", "unknown")
            
            if indicator_type == "phishing_keywords":
                indicators.append({
                    "type": "suspicious_language",
                    "description": f"Contains urgent or threatening language: {', '.join(pattern['matches'][:3])}",
                    "severity": pattern.get("severity", "medium"),
                    "confidence": 0.85
                })
            elif indicator_type == "upi_scam":
                indicators.append({
                    "type": "payment_fraud",
                    "description": pattern.get("description", "UPI scam pattern detected"),
                    "severity": pattern.get("severity", "high"),
                    "confidence": 0.92
                })
            elif indicator_type == "otp_sharing":
                indicators.append({
                    "type": "credential_theft",
                    "description": "Requests sharing of OTP or verification code",
                    "severity": "high",
                    "confidence": 0.95
                })
            elif indicator_type == "social_engineering":
                indicators.append({
                    "type": "manipulation",
                    "description": f"Uses {pattern['tactic']} tactics to manipulate",
                    "severity": pattern.get("severity", "medium"),
                    "confidence": 0.80
                })
        
        return indicators
    
    def _format_patterns(self, patterns: List[Dict]) -> List[Dict]:
        """Format detected patterns"""
        formatted = []
        
        for pattern in patterns[:3]:
            formatted.append({
                "pattern": pattern.get("type", "unknown"),
                "category": pattern.get("pattern", "General Scam"),
                "severity": pattern.get("severity", "medium"),
                "description": pattern.get("description", "Suspicious pattern detected")
            })
        
        return formatted
    
    def _generate_explanation(
        self,
        patterns: List[Dict],
        score: float,
        risk_level: str
    ) -> str:
        """Generate human-readable explanation"""
        if not patterns:
            return "No significant scam indicators detected. However, always verify the source before taking action."
        
        explanation = f"This content shows a {risk_level} risk level with a score of {score:.1f}/100. "
        
        pattern_types = [p.get("type") for p in patterns]
        
        if "otp_sharing" in pattern_types:
            explanation += "It requests sharing of OTP or verification codes, which is a major red flag. "
        
        if "upi_scam" in pattern_types:
            explanation += "It exhibits patterns common in UPI/payment scams. "
        
        if "phishing_keywords" in pattern_types:
            explanation += "It uses urgent or threatening language designed to pressure you into immediate action. "
        
        if "social_engineering" in pattern_types:
            explanation += "It employs psychological manipulation tactics. "
        
        explanation += "Always verify through official channels before responding."
        
        return explanation
    
    def _generate_recommendations(
        self,
        risk_level: str,
        content_type: str
    ) -> List[str]:
        """Generate actionable recommendations"""
        recommendations = []
        
        if risk_level == "high":
            recommendations.extend([
                "🚫 Do NOT click on any links or download attachments",
                "🚫 Do NOT share any personal information, passwords, or OTPs",
                "⚠️ Report this message to the platform and relevant authorities",
                "🔍 Verify the sender's identity through official channels",
                "📞 Contact your bank immediately if financial information was shared"
            ])
        elif risk_level == "medium":
            recommendations.extend([
                "⚠️ Exercise extreme caution before taking any action",
                "🔍 Verify the sender through independent, official channels",
                "🚫 Do not share sensitive information without verification",
                "📱 Contact the organization directly using official contact details",
                "💡 Report suspicious content to help protect others"
            ])
        else:
            recommendations.extend([
                "✓ Content appears relatively safe, but remain cautious",
                "🔍 Verify sender identity if requesting sensitive information",
                "💡 Never share OTPs or passwords with anyone",
                "📚 Stay informed about common scam tactics"
            ])
        
        if content_type == "url":
            recommendations.append("🔒 Ensure the website uses HTTPS and has a valid certificate")
        
        return recommendations


# Global instance
scam_detector = ScamDetector()
