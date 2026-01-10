"""
Kaaval AI - Scam Detection ML Model
AI-powered scam classification using NLP and pattern matching
"""

from typing import Dict, List, Tuple
import re
from datetime import datetime

# Note: In production, replace with actual ML model
# from transformers import AutoTokenizer, AutoModelForSequenceClassification
# import torch

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
    - Rule-based pattern matching
    - ML-based text classification (placeholder for production model)
    - URL analysis
    - Risk scoring algorithm
    """
    
    def __init__(self):
        """Initialize the scam detector"""
        # In production, load pre-trained model here
        # self.tokenizer = AutoTokenizer.from_pretrained("model_name")
        # self.model = AutoModelForSequenceClassification.from_pretrained("model_name")
        pass
    
    def analyze_text(self, content: str, content_type: str = "text") -> Dict:
        """
        Analyze text content for scam indicators
        
        Args:
            content: Text to analyze
            content_type: Type of content (text, email, url, transaction)
            
        Returns:
            Comprehensive analysis results
        """
        start_time = datetime.now()
        
        # Pattern-based analysis
        pattern_results = calculate_pattern_score(content)
        
        # ML-based analysis (using rule-based for now)
        ml_score = self._ml_classify(content)
        
        # Combine scores
        combined_score = (pattern_results["score"] * 0.6) + (ml_score * 0.4)
        
        # Determine risk level
        risk_level = self._calculate_risk_level(combined_score)
        
        # Generate explanation
        explanation = self._generate_explanation(
            pattern_results["patterns"],
            combined_score,
            risk_level
        )
        
        # Generate recommendations
        recommendations = self._generate_recommendations(risk_level, content_type)
        
        # Calculate processing time
        end_time = datetime.now()
        processing_time = int((end_time - start_time).total_seconds() * 1000)
        
        return {
            "riskLevel": risk_level,
            "riskScore": round(combined_score, 1),
            "confidence": 0.85,  # Placeholder confidence score
            "indicators": self._format_indicators(pattern_results["patterns"]),
            "patterns": self._format_patterns(pattern_results["patterns"]),
            "explanation": explanation,
            "recommendations": recommendations,
            "processingTime": processing_time
        }
    
    def analyze_url_content(self, url: str) -> Dict:
        """
        Analyze URL for malicious patterns
        
        Args:
            url: URL to analyze
            
        Returns:
            URL-specific analysis results
        """
        start_time = datetime.now()
        
        url_analysis = analyze_url(url)
        
        risk_level = self._calculate_risk_level(url_analysis["score"])
        
        # Format indicators
        indicators = [
            {
                "type": "url_pattern",
                "description": indicator,
                "severity": "high" if url_analysis["score"] > 50 else "medium",
                "confidence": 0.9
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
        
        end_time = datetime.now()
        processing_time = int((end_time - start_time).total_seconds() * 1000)
        
        return {
            "riskLevel": risk_level,
            "riskScore": round(url_analysis["score"], 1),
            "confidence": 0.88,
            "indicators": indicators,
            "patterns": [],
            "explanation": explanation,
            "recommendations": self._generate_recommendations(risk_level, "url"),
            "processingTime": processing_time
        }
    
    def _ml_classify(self, text: str) -> float:
        """
        ML-based classification (placeholder)
        In production, use trained transformer model
        
        Args:
            text: Text to classify
            
        Returns:
            Risk score from 0-100
        """
        # Placeholder implementation using simple heuristics
        text_lower = text.lower()
        score = 0
        
        # Check for multiple exclamation marks or caps
        if text.count('!') > 2:
            score += 10
        
        caps_ratio = sum(1 for c in text if c.isupper()) / max(len(text), 1)
        if caps_ratio > 0.3:
            score += 15
        
        # Check for numbers (common in scam messages)
        if re.search(r'\d{10,}', text):  # Long number sequences
            score += 10
        
        # Check for currency symbols
        if any(symbol in text for symbol in ['$', '₹', '€', '£']):
            score += 5
        
        return min(score, 100)
    
    def _calculate_risk_level(self, score: float) -> str:
        """Calculate risk level from score"""
        if score >= 70:
            return "high"
        elif score >= 35:
            return "medium"
        else:
            return "low"
    
    def _format_indicators(self, patterns: List[Dict]) -> List[Dict]:
        """Format pattern matches as risk indicators"""
        indicators = []
        
        for pattern in patterns[:5]:  # Limit to top 5
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
        
        for pattern in patterns[:3]:  # Limit to top 3
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
        
        # Add content-specific recommendations
        if content_type == "url":
            recommendations.append("🔒 Ensure the website uses HTTPS and has a valid certificate")
        
        return recommendations


# Global instance
scam_detector = ScamDetector()
