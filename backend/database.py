import os
import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from models import User, Conversation

async def init_db():
    # Retrieve MongoDB URI from environment variables
    mongo_uri = os.getenv("MONGODB_URI")
    db_name = os.getenv("MONGODB_DB_NAME", "muses_sandbox")
    
    if not mongo_uri:
        raise ValueError("MONGODB_URI is not set")

    # TLS certificate is required for some environments, but can cause issues if mismatched
    # client = AsyncIOMotorClient(mongo_uri, tlsCAFile=certifi.where())
    client = AsyncIOMotorClient(mongo_uri, tlsAllowInvalidCertificates=True)
    
    # Initialize Beanie with the product database and documents
    await init_beanie(database=client[db_name], document_models=[User, Conversation])
    
    print(f"Connected to MongoDB Atlas (DB: {db_name})")
