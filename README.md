# Siva Manikanta Galaba - Professional Portfolio

This repository contains the source code for my personal portfolio website, showcasing my projects, technical skills, and experience as a MERN Stack & AI Engineer. 

Live Link: [siva-personalportfolio.vercel.app](https://siva-personalportfolio.vercel.app/)

---

## Technical Architecture

The project is structured as a monorepo containing both the frontend client and serverless backend API integrations:

* **`/frontend`**: React client built with Vite. It features responsive layouts using standard CSS Grids and Flexbox, custom orbital animations powered by Framer Motion, and direct contact widgets.
* **`/api`**: Node.js/Express backend serverless functions configured for Vercel, handling contact emails (via Nodemailer) and routing.

---

## Core Technologies

* **Frontend Engine:** React.js (v19) & Vite
* **Animations:** Framer Motion (for physics-based transitions and color-shifting orbital menus)
* **Styling:** Custom Vanilla CSS (designed from scratch for responsive mobile/desktop layouts)
* **Backend Runtime:** Node.js, Express.js
* **Services:** Nodemailer (email automation), Vercel Serverless Functions

---

## Key Features

1. **Interactive Orbital Telemetry:** A custom-designed, color-shifting dashboard showcasing core academic milestones and project highlights. It features completely static layout anchoring with fluid color and data shifting.
2. **Responsive Hamburger Navigation:** Custom Flexbox navigation that collapses into a capsule dropdown on mobile and expands into a horizontal layout on desktop.
3. **AI Chatbot Integration:** Embedded AI conversational helper styled dynamically to scale cleanly on all screen sizes.
4. **Vercel-Optimized Performance:** Configured with custom serverless endpoint rewrites to guarantee fast loading and secure API delivery.

---

## Local Development

To run the project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/Galabasivamanikanta/siva-portfolio.git
cd siva-portfolio
```

### 2. Run the Frontend (Vite)
```bash
cd frontend
npm install
npm run dev
```
The client will start running locally at `http://localhost:3001` (or the configured port in `vite.config.js`).

---

## Deployment

The platform is configured for zero-configuration deployments on **Vercel**. Every commit pushed to the `main` branch is automatically built and deployed via:
* **Build Command:** `npm run build` (configured at root to build frontend static files into `frontend/dist`).
* **Serverless Routes:** Defined in `vercel.json` to route incoming API requests to the `/api/index.js` serverless handler.
