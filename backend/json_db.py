import hashlib
import json
import os
from typing import List, Optional, Dict
from datetime import datetime
from pydantic import BaseModel

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
USERS_FILE = os.path.join(DATA_DIR, "users.json")
CONVERSATIONS_FILE = os.path.join(DATA_DIR, "conversations.json")

class User(BaseModel):
    username: str
    password_hash: str
    created_at: str

class Conversation(BaseModel):
    id: str
    username: str
    scenario: str
    title: str
    history: List[dict]
    created_at: str
    updated_at: str

class JSONDatabase:
    def __init__(self):
        os.makedirs(DATA_DIR, exist_ok=True)
        self._ensure_file(USERS_FILE)
        self._ensure_file(CONVERSATIONS_FILE)

    def _ensure_file(self, filepath):
        if not os.path.exists(filepath):
            with open(filepath, 'w') as f:
                json.dump([], f)

    def _read_json(self, filepath) -> List[Dict]:
        if not os.path.exists(filepath):
            return []
        with open(filepath, 'r') as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []

    def _write_json(self, filepath, data: List[Dict]):
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)
            
    def _hash_password(self, password: str) -> str:
        return hashlib.sha256(password.encode()).hexdigest()

    # User Methods
    def get_user(self, username: str) -> Optional[User]:
        users = self._read_json(USERS_FILE)
        for u in users:
            if u["username"] == username:
                return User(**u)
        return None

    def create_user(self, username: str, password: str) -> User:
        users = self._read_json(USERS_FILE)
        for u in users:
            if u["username"] == username:
                return User(**u)
        
        new_user = User(
            username=username,
            password_hash=self._hash_password(password),
            created_at=datetime.utcnow().isoformat()
        )
        users.append(new_user.model_dump())
        self._write_json(USERS_FILE, users)
        return new_user
        
    def verify_password(self, username: str, password: str) -> bool:
        user = self.get_user(username)
        if not user:
            return False
        return user.password_hash == self._hash_password(password)

    # Conversation Methods
    def get_conversations(self, username: str) -> List[Conversation]:
        convs = self._read_json(CONVERSATIONS_FILE)
        return [Conversation(**c) for c in convs if c["username"] == username]

    def save_conversation(self, conversation: Conversation):
        convs = self._read_json(CONVERSATIONS_FILE)
        existing_idx = next((i for i, c in enumerate(convs) if c["id"] == conversation.id), -1)
        
        if existing_idx >= 0:
            convs[existing_idx] = conversation.model_dump()
        else:
            convs.append(conversation.model_dump())
            
        self._write_json(CONVERSATIONS_FILE, convs)
