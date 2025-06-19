from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()

# app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_root():
    index_path = os.path.join(os.path.dirname(__file__), '..', '..', 'client', 'index.html')
    index_path = os.path.abspath(index_path)
    return FileResponse(index_path)