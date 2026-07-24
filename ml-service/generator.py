from fpdf import FPDF
import os

def create_resume_pdf(role: str, recruiter_id: str) -> str:
    pdf = FPDF()
    pdf.add_page()
    
    # Title
    pdf.set_font("Arial", 'B', 24)
    pdf.cell(200, 20, txt="Siva's Resume", ln=True, align='C')
    
    pdf.set_font("Arial", 'I', 14)
    pdf.cell(200, 10, txt=f"Tailored for: {role} Position", ln=True, align='C')
    
    pdf.line(10, 40, 200, 40)
    pdf.ln(15)
    
    # Dynamic Content based on Role
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(200, 10, txt="Technical Summary", ln=True)
    pdf.set_font("Arial", '', 12)
    
    if role == "Backend":
        summary = "Experienced in building scalable Node.js and Python microservices. Expert in database optimization, API design, and distributed systems."
        skills = "Skills: Node.js, Express, Python, FastAPI, MongoDB, PostgreSQL, Docker, AWS"
    elif role == "Frontend":
        summary = "Passionate UI/UX developer specialized in React. Proven track record of building performant, accessible, and stunning user interfaces."
        skills = "Skills: React, JavaScript/TypeScript, CSS/Tailwind, Vite, Redux"
    elif role == "ML":
        summary = "Machine Learning enthusiast bridging the gap between data science and software engineering. Experienced in NLP and LLM integrations."
        skills = "Skills: Python, TensorFlow, PyTorch, LangChain, Pandas, SQL"
    else: # Full-stack
        summary = "Versatile Full-Stack Developer bridging seamless frontend experiences with robust backend architectures."
        skills = "Skills: React, Node.js, Python, MongoDB, SQL, System Design"

    pdf.multi_cell(0, 10, txt=summary)
    pdf.ln(5)
    pdf.set_font("Arial", 'B', 12)
    pdf.multi_cell(0, 10, txt=skills)
    
    pdf.ln(10)
    pdf.set_font("Arial", 'I', 10)
    pdf.cell(0, 10, txt=f"Generated specifically for Recruiter ID: {recruiter_id}", ln=True, align='C')
    
    # Save the PDF
    output_dir = "generated_resumes"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    file_path = os.path.join(output_dir, f"resume_{recruiter_id}_{role}.pdf")
    pdf.output(file_path)
    
    return file_path
