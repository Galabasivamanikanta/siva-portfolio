from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import math
from generator import create_resume_pdf

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResumeRequest(BaseModel):
    role: str
    recruiter_id: str

@app.post("/generate-resume")
async def generate_resume(request: ResumeRequest):
    try:
        # Generate PDF based on requested role
        pdf_path = create_resume_pdf(request.role, request.recruiter_id)
        
        if not os.path.exists(pdf_path):
            raise HTTPException(status_code=500, detail="Failed to generate PDF")
            
        return FileResponse(
            path=pdf_path, 
            filename=f"Siva_Resume_{request.role}.pdf",
            media_type="application/pdf"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/generate-3d-pattern")
async def generate_3d_pattern(points: int = 1500, pattern_type: str = "torus"):
    """
    Python backend generating 3D mathematical geometric pattern coordinates
    for rendering high-tech 3D visual assets on the frontend canvas.
    """
    coordinates = []
    
    if pattern_type == "torus":
        # Torus Knot mathematical 3D curve
        p, q = 3, 7
        R, r = 3, 1
        for i in range(points):
            t = (i / points) * 2 * math.pi * p
            x = (R + r * math.cos(q * t / p)) * math.cos(t)
            y = (R + r * math.cos(q * t / p)) * math.sin(t)
            z = r * math.sin(q * t / p)
            coordinates.extend([round(x, 4), round(y, 4), round(z, 4)])
            
    elif pattern_type == "wave":
        # 3D Grid Wave surface
        grid_size = int(math.sqrt(points))
        for i in range(grid_size):
            for j in range(grid_size):
                u = (i / grid_size) * 10 - 5
                v = (j / grid_size) * 10 - 5
                w = math.sin(math.sqrt(u*u + v*v)) * 1.5
                coordinates.extend([round(u, 4), round(w, 4), round(v, 4)])
                
    else:
        # Sphere shell distribution
        phi = (1 + math.sqrt(5)) / 2 # Golden ratio
        for i in range(points):
            y = 1 - (i / float(points - 1)) * 2
            radius = math.sqrt(1 - y * y)
            theta = 2 * math.pi * i / phi
            x = math.cos(theta) * radius * 4
            z = math.sin(theta) * radius * 4
            y = y * 4
            coordinates.extend([round(x, 4), round(y, 4), round(z, 4)])
            
    return JSONResponse(content={
        "status": "success",
        "pattern": pattern_type,
        "points_count": len(coordinates) // 3,
        "data": coordinates
    })

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
