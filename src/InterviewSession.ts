// This line allows us to use the Cloudflare AI models.
import { Ai } from '@cloudflare/ai';

// This defines the structure for a single message in our chat history.
interface Message {
	role: 'system' | 'user' | 'assistant';
	content: string;
}

// This is our main Durable Object class.
export class InterviewSession {
	state: DurableObjectState;
	ai: Ai;

	constructor(state: DurableObjectState, env: any) {
		this.state = state;
		this.ai = new Ai(env.AI);
	}

	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		switch (url.pathname) {
			case '/start': {
				const { jobRole } = (await request.json()) as { jobRole: string };
				await this.state.storage.deleteAll();
				await this.state.storage.put('jobRole', jobRole);

				// --- AI PERSONA CHANGE IS HERE ---
				const systemPrompt = `You are a friendly and professional HR interviewer conducting a behavioral screening for a ${jobRole}. Your goal is to ask 5 insightful behavioral questions based on the STAR method (Situation, Task, Action, Result) to understand the candidate's past experiences with teamwork, problem-solving, and handling challenges. Do not ask technical questions like "What is a variable?". Start by introducing yourself and asking the first behavioral question. Keep your tone encouraging and professional.`;

				const messages: Message[] = [{ role: 'system', content: systemPrompt }];
				const response = await this.ai.run('@cf/meta/llama-3-8b-instruct', { messages });

				messages.push({ role: 'assistant', content: response.response! });
				await this.state.storage.put('messages', messages);

				return new Response(JSON.stringify({ question: response.response }), {
					headers: { 'Content-Type': 'application/json' },
				});
			}

			case '/answer': {
				const { answer } = (await request.json()) as { answer: string };
				const messages: Message[] | undefined = await this.state.storage.get('messages');

				if (!messages) {
					return new Response('No interview in progress. Please start a new one.', { status: 400 });
				}

				messages.push({ role: 'user', content: answer });
				const response = await this.ai.run('@cf/meta/llama-3-8b-instruct', { messages });
				
				messages.push({ role: 'assistant', content: response.response! });
				await this.state.storage.put('messages', messages);

				return new Response(JSON.stringify({ question: response.response }), {
					headers: { 'Content-Type': 'application/json' },
				});
			}
            
			case '/summary': {
				const messages: Message[] | undefined = await this.state.storage.get('messages');
				if (!messages) {
					return new Response('No interview to summarize.', { status: 400 });
				}

                // --- SUMMARY PROMPT CHANGE IS HERE ---
				const summaryPrompt = `Based on the preceding interview transcript, provide a concise summary of the candidate's behavioral competencies. Highlight examples of their teamwork, problem-solving, and communication skills using the STAR method framework. Note any potential red flags or areas for follow-up. Format the output as a simple paragraph.`;
				messages.push({ role: 'system', content: summaryPrompt });

				const response = await this.ai.run('@cf/meta/llama-3-8b-instruct', { messages });

				return new Response(JSON.stringify({ summary: response.response }), {
					headers: { 'Content-Type': 'application/json' },
				});
			}

			default:
				return new Response('Not found', { status: 404 });
		}
	}
}