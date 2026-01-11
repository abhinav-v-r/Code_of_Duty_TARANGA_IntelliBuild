"""
Kaaval AI - FastAPI Backend Service
AI-powered scam detection API
"""

from fastapi import FastAPI, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict
from datetime import datetime
import uvicorn
import logging
import re

from models.scam_detector import scam_detector

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Kaaval AI - Scam Detection API",
    description="Enterprise-grade AI-powered scam detection and fraud prevention platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://kaavalai.com",
        "https://*.kaavalai.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response Models
class ScamAnalysisRequest(BaseModel):
    content: str = Field(..., min_length=1, max_length=10000)
    type: str = Field(default="text", pattern="^(text|url|email|transaction)$")
    metadata: Optional[Dict] = None
    
    @validator('content')
    def sanitize_content(cls, v):
        """Sanitize input content"""
        # Basic sanitization - in production, use more robust methods
        if len(v.strip()) == 0:
            raise ValueError("Content cannot be empty")
        return v.strip()


class URLAnalysisRequest(BaseModel):
    url: str = Field(..., min_length=1, max_length=2048)
    
    @validator('url')
    def validate_url(cls, v):
        """Validate URL format"""
        # Basic URL validation
        url_pattern = re.compile(
            r'^https?://'  # http:// or https://
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domain
            r'localhost|'  # localhost
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # or IP
            r'(?::\d+)?'  # optional port
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)
        
        if not url_pattern.match(v):
            raise ValueError("Invalid URL format")
        return v


class RiskIndicator(BaseModel):
    type: str
    description: str
    severity: str
    confidence: float


class ScamPattern(BaseModel):
    pattern: str
    category: str
    severity: str
    description: str


class ScamAnalysisResponse(BaseModel):
    id: str
    risk_level: str
    risk_score: float
    confidence: float
    indicators: List[RiskIndicator]
    patterns: List[ScamPattern]
    explanation: str
    recommendations: List[str]
    timestamp: str
    processing_time: int


class PlatformStats(BaseModel):
    scams_detected: int
    users_protected: int
    reports_submitted: int
    accuracy_rate: float
    last_updated: str


class APIResponse(BaseModel):
    success: bool
    data: Optional[Dict] = None
    error: Optional[Dict] = None
    timestamp: str


# Middleware for request logging and rate limiting
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all requests"""
    start_time = datetime.now()
    
    # Log request
    logger.info(f"Request: {request.method} {request.url.path}")
    
    response = await call_next(request)
    
    # Log processing time
    process_time = (datetime.now() - start_time).total_seconds() * 1000
    logger.info(f"Completed in {process_time:.2f}ms with status {response.status_code}")
    
    return response


# API Endpoints
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Kaaval AI - Scam Detection API",
        "version": "1.0.0",
        "status": "operational",
        "docs": "/api/docs"
    }


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "ai-scam-detection"
    }


@app.post("/api/analyze", response_model=APIResponse)
async def analyze_content(request: ScamAnalysisRequest):
    """
    Analyze content for scam indicators
    
    - **content**: Text content to analyze
    - **type**: Type of content (text, email, transaction)
    - **metadata**: Optional metadata
    """
    try:
        logger.info(f"Analyzing content of type: {request.type}")
        
        # Perform async analysis with Gemini AI
        analysis_result = await scam_detector._analyze_text_async(
            content=request.content,
            content_type=request.type
        )
        
        # Generate unique ID
        analysis_id = f"analysis-{datetime.now().timestamp()}"
        
        # Format response
        response_data = {
            "id": analysis_id,
            **analysis_result,
            "timestamp": datetime.now().isoformat()
        }
        
        logger.info(f"Analysis completed: {analysis_id} - Risk: {analysis_result['riskLevel']} - AI: {analysis_result.get('aiPowered', False)}")
        
        return APIResponse(
            success=True,
            data=response_data,
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        logger.error(f"Analysis error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Analysis failed: {str(e)}"
        )


@app.post("/api/analyze-url", response_model=APIResponse)
async def analyze_url(request: URLAnalysisRequest):
    """
    Analyze URL for suspicious patterns
    
    - **url**: URL to analyze
    """
    try:
        logger.info(f"Analyzing URL: {request.url}")
        
        # Perform async URL analysis with Gemini AI
        analysis_result = await scam_detector._analyze_url_async(request.url)
        
        # Generate unique ID
        analysis_id = f"url-analysis-{datetime.now().timestamp()}"
        
        # Format response
        response_data = {
            "id": analysis_id,
            **analysis_result,
            "timestamp": datetime.now().isoformat()
        }
        
        logger.info(f"URL analysis completed: {analysis_id} - Risk: {analysis_result['riskLevel']} - AI: {analysis_result.get('aiPowered', False)}")
        
        return APIResponse(
            success=True,
            data=response_data,
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        logger.error(f"URL analysis error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"URL analysis failed: {str(e)}"
        )


@app.get("/api/stats", response_model=APIResponse)
async def get_platform_stats():
    """
    Get platform statistics
    """
    try:
        # In production, fetch from database
        stats = {
            "scams_detected": 1247896,
            "users_protected": 5634521,
            "reports_submitted": 89234,
            "accuracy_rate": 94.7,
            "last_updated": datetime.now().isoformat()
        }
        
        return APIResponse(
            success=True,
            data=stats,
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        logger.error(f"Stats error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch stats: {str(e)}"
        )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Custom exception handler"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": {
                "code": f"HTTP_{exc.status_code}",
                "message": exc.detail
            },
            "timestamp": datetime.now().isoformat()
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Handle all unhandled exceptions"""
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": {
                "code": "INTERNAL_ERROR",
                "message": "An unexpected error occurred"
            },
            "timestamp": datetime.now().isoformat()
        }
    )


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
