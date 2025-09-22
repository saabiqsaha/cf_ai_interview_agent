# CF workers AI Behavioral Screener

**Live Demo URL:** [https://cf_ai_interview_agent.interviewer.workers.dev](https://cf_ai_interview_agent.interviewer.workers.dev)

This project is an AI-powered agent that conducts automated behavioral interviews. It's built entirely on the Cloudflare stack to fulfill the requirements of the SWE Intern AI assignment.

---

### ✅ Core Requirements

* **🧠 LLM:** Uses **Cloudflare Workers AI** to run the `@cf/meta/llama-3-8b-instruct` model.
* **⚙️ Workflow:** A central **Cloudflare Worker** acts as the router and main entry point.
* **💬 User Input:** The UI is a static HTML page served via **Cloudflare Pages**.
* **💾 Memory/State:** Conversation history is managed by a **Durable Object** for stateful, contextual interviews.

---

### 📸 Application Screenshots

*(Placeholder: Replace this text and the link with a screenshot of your app's landing page)*
![Landing Page](https://i.imgur.com/your-screenshot-url-1.png)

*(Placeholder: Replace this text and the link with a screenshot of an in-progress interview)*
![Interview in Progress](https://i.imgur.com/your-screenshot-url-2.png)

---

### 🚀 How to Run Locally

1.  **Clone & Install:**
    ```bash
    git clone [https://github.com/saabiqsaha/cf_ai_interview_agent.git](https://github.com/saabiqsaha/cf_ai_interview_agent.git)
    cd cf_ai_interview_agent
    npm install
    ```
2.  **Run Locally:**
    ```bash
    wrangler dev --local
    ```
3.  Open `http://localhost:8787` in your browser.

---

### 👨‍💻 Developer

* **Mohammed Abdulai**
    * **LinkedIn:** [linkedin.com/in/mohammed-saabiq-saha-abdulai](https://www.linkedin.com/in/mohammed-saabiq-saha-abdulai-099b00257/)
    * **GitHub:** [github.com/saabiqsaha](https://github.com/saabiqsaha)
