from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict
from typing import List
import asyncio

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

# Allowed origins for CORS
origins = [
    "http://localhost",
    "http://localhost:3001",
    "http://localhost:3000",
    "http://localhost:3002"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simulated cache dictionary
cache: Dict[str, str] = {}

# Request model
class QueryRequest(BaseModel):
    query: str

# Response model
class QueryResponse(BaseModel):
    response: str

class Document(BaseModel):
    title: str
    content: str

class DocumentsResponse(BaseModel):
    documents: List[Document]

# Hardcoded documents
documents_data = [
    {"title": "Doc 1", "content": "Questo è l'inizio del documento uno..."},
    {"title": "Doc 2", "content": "Questo è l'inizio di un altro documento ..."},
    {"title": "Doc 3", "content": "Un altro esempio di documento interessante..."},
]

# Simulate reading from the cache with async wait
async def get_from_cache(query: str) -> str:
    await asyncio.sleep(2)  # Simulate 2 seconds wait
    return cache.get(query)

# Simulate writing to the cache with async wait
async def set_to_cache(query: str, response: str):
    await asyncio.sleep(2)  # Simulate 2 seconds wait
    cache[query] = response

# Simulate AI response generation
def generate_ai_response(query: str) -> str:
    return f"Certo che conosco {query}! Puoi approfondire con questi documenti..."


# Root endpoint
@app.get("/")
def read_root():
    return {"Hello": "World"}

# Generate response endpoint
@app.post("/generate", response_model=QueryResponse)
async def generate(query: QueryRequest):
    # Check if the response is already in cache
    cached_response = await get_from_cache(query.query)
    if cached_response:
        # If found in cache, return the cached response
        return QueryResponse(response=cached_response)
    
    # Otherwise, generate a new response and save it to cache
    response = generate_ai_response(query.query)
    await set_to_cache(query.query, response)
    return QueryResponse(response=response)

@app.get("/documents", response_model=DocumentsResponse)
async def get_documents():
    # Return hardcoded documents
    return DocumentsResponse(documents=documents_data)

