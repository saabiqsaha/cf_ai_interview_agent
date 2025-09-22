# AI-Assisted Development Prompts

This file documents my use of AI as a development tool for specific tasks during the creation of the AI Behavioral Screener, as required by the Cloudflare assignment.

**AI Model Used:** Google Gemini

---

### Prompt 1: Architecture Validation

**Prompt:**
> "I'm planning an AI interviewer for the Cloudflare assignment. My proposed architecture is a Cloudflare Worker as the main router, a Durable Object to manage chat history and state for each session, and a static HTML/JS frontend on Pages. Does this architecture correctly align with Cloudflare's best practices for building stateful AI agents?"

**Purpose:** To validate my initial design against Cloudflare's recommended patterns before writing code.

---

### Prompt 2: Refining Durable Object State Management

**Prompt:**
> "In my Durable Object, I am storing chat history in an array. As the conversation grows, what is the most efficient way to append new messages to this array in `this.state.storage` without reading and writing the entire object on every turn?"

**Purpose:** To research the performance best practices for managing state within Durable Objects.

---

### Prompt 3: System Prompt Refinement

**Prompt:**
> "Here is a draft for my AI's system prompt: 'You are an interviewer. Ask behavioral questions.' Can you help me refine this to be more specific? I want it to adopt a professional persona, focus on STAR-method questions, and avoid technical topics."

**Purpose:** To get feedback and improve my prompt engineering for better control over the AI's behavior and tone.

---

### Prompt 4: Debugging a Platform-Specific Error

**Prompt:**
> "I'm getting an error during `wrangler deploy`: `code: 10097`, related to `new_classes` and Durable Objects on the free plan. What is the specific configuration change needed in `wrangler.jsonc` to resolve this for deployment?"

**Purpose:** To quickly understand and resolve a specific deployment error related to Cloudflare's platform rules.

---

### Prompt 5: Frontend Styling Assistance

**Prompt:**
> "I have a basic HTML structure for my app's landing page. Can you provide the Tailwind CSS classes needed to style a professional-looking header that includes project details, my name, and relevant links in a clean, grid-based layout?"

**Purpose:** To accelerate frontend styling by converting a structural idea into a polished UI with Tailwind CSS.
