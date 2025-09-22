// This line allows us to use the Cloudflare AI models.
import { Ai } from '@cloudflare/ai';

// This defines the structure for a single message in our chat history.
// 'role' can be 'system' (our instructions), 'user', or 'assistant' (the AI).
interface Message {
	role: 'system' | 'user' | 'assistant';
	content: string;
}

// This is our main Durable Object class.
// It will manage the state and logic for one single interview.
export class InterviewSession {
	// `state` is a special object provided by Cloudflare to store data permanently.
	state: DurableObjectState;
	// `ai` will be our connection to the AI models.
	ai: Ai;

	constructor(state: DurableObjectState, env: any) {
		this.state = state;
		// We create our AI client, using the "AI" binding we set up in wrangler.jsonc
		this.ai = new Ai(env.AI);
	}

	// The `fetch` method is the main entry point for all requests sent to this specific interview session.
	async fetch(request: Request): Promise<Response> {
		// We'll check the URL to decide what action to take (e.g., /start, /answer).
		const url = new URL(request.url);
		switch (url.pathname) {
			case '/start': {
				// This block runs when a user starts a new interview.
				const { jobRole } = (await request.json()) as { jobRole: string };

				// Clear any old data from a previous session and save the new job role.
				await this.state.storage.deleteAll();
				await this.state.storage.put('jobRole', jobRole);

				// This is the "system prompt". It's our crucial instruction to the AI, telling it how to behave.
				const systemPrompt = `You are an expert interviewer for the role of ${jobRole}. You are conducting a screening interview. Your goal is to ask 5 challenging questions to assess the candidate's skills. Start by introducing yourself and asking the first question. Keep your responses concise and professional. Do not ask more than 5 questions.`;

				// We start the conversation history with our system prompt.
				const messages: Message[] = [{ role: 'system', content: systemPrompt }];

				// We run the AI model to get the first greeting and question.
				const response = await this.ai.run('@cf/meta/llama-3-8b-instruct', { messages });

				// Add the AI's first message to our history...
				messages.push({ role: 'assistant', content: response.response! });
				// ...and save the entire conversation history to the Durable Object's storage.
				await this.state.storage.put('messages', messages);

				// Send the AI's first question back to the user's browser.
				return new Response(JSON.stringify({ question: response.response }), {
					headers: { 'Content-Type': 'application/json' },
				});
			}

			case '/answer': {
				// This block runs when a user submits an answer.
				const { answer } = (await request.json()) as { answer: string };

				// First, get the conversation history from storage.
				let messages: Message[] = (await this.state.storage.get('messages')) || [];

				// Add the user's new answer to the history.
				messages.push({ role: 'user', content: answer });

				// Send the entire conversation history to the AI to get the next question.
				const response = await this.ai.run('@cf/meta/llama-3-8b-instruct', { messages });

				// Add the AI's new question to the history.
				messages.push({ role: 'assistant', content: response.response! });

				// Save the updated history back to storage.
				await this.state.storage.put('messages', messages);

				// Send the new question back to the user.
				return new Response(JSON.stringify({ question: response.response }), {
					headers: { 'Content-Type': 'application/json' },
				});
			}

			case '/summary': {
				// This block runs at the end of the interview.
				let messages: Message[] = (await this.state.storage.get('messages')) || [];

				// Add a final instruction to the AI.
				messages.push({
					role: 'user',
					content: 'The interview is now complete. Please provide a brief, constructive summary of my performance based on my answers.',
				});

				// Run the AI to get the final summary.
				const response = await this.ai.run('@cf/meta/llama-3-8b-instruct', { messages });

				// Send the summary back to the user.
				return new Response(JSON.stringify({ summary: response.response }), {
					headers: { 'Content-Type': 'application/json' },
				});
			}

			default:
				return new Response('Not found', { status: 404 });
		}
	}
}

