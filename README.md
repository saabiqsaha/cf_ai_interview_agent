# Cloudflare AI Interviewer

**🚀 Live Demo:** https://cf_ai_interview_agent.interviewer.workers.dev  
**📁 Repository:** https://github.com/saabiqsaha/cf_ai_interview_agent

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange?style=flat&logo=cloudflare)](https://workers.cloudflare.com)

This project is a simple but powerful AI agent that conducts automated behavioral interviews, built entirely on the Cloudlfare AI stack.

---
## ✅ Core Requirements

* **🧠 LLM:** Uses **Cloudflare Workers AI** to run the `@cf/meta/llama-3-8b-instruct` model.
* **⚙️ Workflow:** A central **Cloudflare Worker** acts as the router and main entry point.
* **💬 User Input:** The UI is a static HTML page served via **Cloudflare Pages**.
* **💾 Memory/State:** Conversation history is managed by a **Durable Object** for stateful, contextual interviews.
---

## Screenshots

<div align="center">

![Interview Chat](public/cloud_chat.png)
![Cloudflare Integration](public/cloudflare.png)

</div>


## Quick Start

```bash
git clone https://github.com/saabiqsaha/cf_ai_interview_agent.git
cd cf_ai_interview_agent && npm install
wrangler dev --local
```

## 👨‍💻 Developer

**Mohammed Saabiq Saha Abdulai**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?logo=linkedin)](https://www.linkedin.com/in/mohammed-saabiq-saha-abdulai-099b00257/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?logo=github)](https://github.com/saabiqsaha)

---

<div align="center">
<i>Built with Cloudflare's edge computing platform for global performance and scalability.</i>
</div>
