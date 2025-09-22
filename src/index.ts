// We need to import the Durable Object class we just created.
import { InterviewSession } from './InterviewSession';

// This defines the "bindings" that Cloudflare makes available to our Worker.
// We've added ASSETS, which is our connection to the 'public' folder.
export interface Env {
	INTERVIEW_SESSION: DurableObjectNamespace;
	AI: any;
	ASSETS: Fetcher;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);

		// If the request is for an API endpoint, forward it to the Durable Object.
		if (url.pathname.startsWith('/start') || url.pathname.startsWith('/answer') || url.pathname.startsWith('/summary')) {
			// Every interview needs a unique ID. We'll create a new one for each conversation.
			// Using a simple random ID is fine for this project.
			const interviewId = crypto.randomUUID();

			// Get the specific Durable Object instance for this interview.
			const id = env.INTERVIEW_SESSION.idFromString(interviewId);
			const stub = env.INTERVIEW_SESSION.get(id);

			// Forward the request to the Durable Object.
			return stub.fetch(request);
		}

		// Otherwise, it's a request for a static asset (like our index.html).
		// Let the ASSETS binding handle serving the file from the `public` directory.
		return env.ASSETS.fetch(request);
	},
};

// CRITICAL: We also need to export the Durable Object class from our main entrypoint file.
// This tells the Cloudflare runtime where to find the code for the "InterviewSession" class
// that we referenced in our wrangler.jsonc file.
export { InterviewSession } from './InterviewSession';

