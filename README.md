# AI Behavioral Screener - Cloudflare SWE Intern Assignment

**Live Demo URL:** [https://cf_ai_interview_agent.interviewer.workers.dev](https://cf_ai_interview_agent.interviewer.workers.dev)

---

## Project Overview

This project is an AI-powered behavioral screening agent built to fulfill the requirements of the Cloudflare Software Engineer Intern AI assignment. It provides an interactive chat interface where a user can select a candidate profile and undergo a simulated behavioral interview.

The AI agent asks a series of five insightful questions based on the STAR method to assess a candidate's soft skills in areas like teamwork, problem-solving, and handling workplace challenges. Upon completion, the agent provides a concise summary of the candidate's performance.

This application is built entirely on the Cloudflare developer platform, demonstrating a practical understanding of serverless architecture and AI integration.

## Core Technical Requirements Met

This project successfully implements all components specified in the assignment:

* **LLM (Large Language Model):**
    * Utilizes **Cloudflare Workers AI** to run the `@cf/meta/llama-3-8b-instruct` model for generating intelligent and context-aware interview questions and summaries.

* **Workflow / Coordination:**
    * A primary **Cloudflare Worker** (`src/index.ts`) acts as the main entry point and router, directing API traffic and serving the frontend application.

* **User Input:**
    * The user interface is a static `index.html` file served via **Cloudflare Pages** (using the `assets` binding), providing a clean and responsive chat experience.

* **Memory / State:**
    * Each interview's conversation history is managed by a **Durable Object** (`src/InterviewSession.ts`). This provides a stateful, persistent memory for the AI, allowing it to remember the context of the entire conversation from start to finish.

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/saabiqsaha/cf_ai_interview_agent.git](https://github.com/saabiqsaha/cf_ai_interview_agent.git)
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd cf_ai_interview_agent
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the local development server:**
    ```bash
    wrangler dev --local
    ```
5.  Open `http://localhost:8787` in your browser.

## Developer

* **Mohammed Abdulai**
    * **LinkedIn:** [https://www.linkedin.com/in/mohammed-saabiq-saha-abdulai-099b00257/](https://www.linkedin.com/in/mohammed-saabiq-saha-abdulai-099b00257/)
    * **GitHub:** [https://github.com/saabiqsaha](https://github.com/saabiqsaha)
