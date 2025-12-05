from datetime import datetime
from typing import List, Optional
from beanie import Document, Indexed
from pydantic import Field

class User(Document):
    username: str = Indexed(unique=True)
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Settings:
        name = "users"

class Conversation(Document):
    user_username: str = Indexed() # Reference to User.username
    scenario: str
    title: str = "New Conversation"
    history: List[dict] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "conversations"
