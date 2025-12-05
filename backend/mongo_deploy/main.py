import hashlib
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Load env before imports
load_dotenv()

from database import init_db
from models import User

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to DB
    try:
        await init_db()
        print("Database connected successfully")
    except Exception as e:
        print(f"Database connection failed: {e}")
        # We allow the app to start even if DB fails, giving us a chance to see 500 errors with CORS
    yield
    # Shutdown

app = FastAPI(lifespan=lifespan, title="Muses-bench Web Sandbox (MongoDB)")

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://muses-bench-sandbox.vercel.app",  # Your Frontend Deployment
    "*" # Fallback
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    username: str
    password: str

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

@app.get("/")
def root():
    return {"message": "Muses-bench Sandbox API is running"}

@app.post("/auth/login")
async def login(data: LoginRequest):
    """
    Combined Login/Register (Async MongoDB):
    - If user exists -> Verify password
    - If user new -> Create with password
    """
    if not data.username or not data.password:
        raise HTTPException(status_code=400, detail="Username and password required")
    
    # Check if user exists (Async)
    existing_user = await User.find_one(User.username == data.username)
    
    hashed_input = hash_password(data.password)

    if existing_user:
        # Verify Password
        if existing_user.password_hash == hashed_input:
             return {
                "status": "success",
                "user": {
                    "username": existing_user.username,
                    "created_at": existing_user.created_at.isoformat()
                },
                "message": "Logged in successfully"
            }
        else:
            raise HTTPException(status_code=401, detail="Incorrect password")
    else:
        # Create New User
        new_user = User(
            username=data.username,
            password_hash=hashed_input
        )
        await new_user.insert()
        
        return {
            "status": "success",
            "user": {
                "username": new_user.username,
                "created_at": new_user.created_at.isoformat()
            },
            "message": "Account created successfully"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
