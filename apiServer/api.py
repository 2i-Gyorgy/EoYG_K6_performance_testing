from fastapi import FastAPI

# creating API
app = FastAPI()

# default route
@app.get("/")
async def root():
    return {
            "welcome_message": "left or right?",
            "direction": [
                {
                    "left": "http://localhost:8000/api/direction/left"
                },
                {
                    "right": "http://localhost:8000/api/direction/right"
                }
            ]
    };

# left route
@app.get("/api/direction/left")
async def left():
    return {
        "tree": "tall",
        "grass": "long",
        "sea": "deep"
    }

# right route
@app.get("/api/direction/right")
async def right():
    return {
        "cloud": "fluffy",
        "flower": "smelly",
        "rock": "heavy"
    }