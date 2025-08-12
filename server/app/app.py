from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os
import re
from pydantic import BaseModel
from ..database.database import Database
from security import Security
import httpx
from dotenv import load_dotenv


app = FastAPI()

# app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/login")
async def read_root():
    index_path = os.path.join(os.path.dirname(__file__), '..', '..', 'client', 'index.html')
    index_path = os.path.abspath(index_path)
    return FileResponse(index_path)

class SignupRequest(BaseModel):
    username: str
    email: str
    password: str
    confirmationPassword: str

async def add_new_account(new_user: SignupRequest) -> None:
    password_security = Security()
    password_hash = Security.hash_password_anync(new_user.password)

    Database.add_user(new_user.username, new_user.email, password_hash)
    


@app.post("/signup")
async def signup(request: SignupRequest) -> dict:
    """Signup api method to validate user account data and add new account data to the database."""
    response = {
        "completed_signup" : "",
        "usernameFeedback" : "",
        "emailFeedback" : "",
        "passwordFeedback" : "",
        "confirmationPasswordFeedback" : ""
    }
    # Validate registration data
    # Assume we get the data from request body
    username = request.username
    email = request.email
    password = request.password
    confirmation_password = request.confirmationPassword

    valid_input = True

    # Username validation
    username_pattern = re.compile(r'^[a-zA-Z0-9._-]+$')
    if len(username) < 8:
        response["usernameFeedback"] = "Username must be atleast 8 characters long"
        valid_input = False
    elif len(username) > 24:
        response["usernameFeedback"] = "Username cannot be longer longer than 24 characters"
        valid_input = False
    elif not username_pattern.match(username):
        response["usernameFeedback"] = "Only letters, digits, hyphens, underscores or periods are allowed"
        valid_input = False

    # Email validation
    email_pattern = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')
    if not email_pattern.match(email):
        response["emailFeedback"] = "Please enter a valid e-mail address"
        valid_input = False

    # Password validation
    password_pattern = re.compile(r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-_.]).{8,32}$')
    if not password_pattern.match(password):
        response["passwordFeedback"] = "Please enter a valid password"
        valid_input = False

    # Confirmation password validation
    if confirmation_password != password:
        response["confirmationPasswordFeedback"] = "Passwords must match"
        valid_input = False
    
    
    response["completed_signup"] = str(valid_input).lower()

    if valid_input == True:
        add_new_account(request)

    return response




class RecipeSearchRequest(BaseModel):
    query: str
    number: int = 10

@app.post("/search-recipes")
async def search_recipes(request: RecipeSearchRequest) -> dict:
    """Search for recipes using Spoonacular API."""
    load_dotenv()
    api_key = os.getenv("SPOONACULAR_API_KEY")
    
    if not api_key:
        return {"error": "API key not configured"}
    
    try:
        async with httpx.AsyncClient() as client:
            # Search for recipes
            search_url = "https://api.spoonacular.com/recipes/complexSearch"
            search_params = {
                "apiKey": api_key,
                "query": request.query,
                "number": request.number,
                "addRecipeInformation": True,
                "addRecipeNutrition": True,
                "fillIngredients": True
            }
            
            search_response = await client.get(search_url, params=search_params)
            search_response.raise_for_status()
            search_data = search_response.json()
            
            recipes = []
            for recipe in search_data.get("results", []):
                recipe_info = {
                    "name": recipe.get("title", ""),
                    "type": recipe.get("dishTypes", []),
                    "nutrition": recipe.get("nutrition", {}),
                    "ingredients": [ingredient.get("original", "") for ingredient in recipe.get("extendedIngredients", [])],
                    "intolerances": recipe.get("diets", [])
                }
                recipes.append(recipe_info)
            
            return {"recipes": recipes}
            
    except httpx.HTTPError as e:
        return {"error": f"API request failed: {str(e)}"}
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}