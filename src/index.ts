// We need to import the Durable Object class we just created.
import { InterviewSession } from './InterviewSession';

// This defines the "bindings" that Cloudflare makes available to our Worker.
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
			
            // --- THIS IS THE CORRECTED CODE ---
            // We get a single, consistent Durable Object instance using a fixed name.
            // This ensures all messages in a session go to the same "room" and fixes the ID format error.
			const id = env.INTERVIEW_SESSION.idFromName("shared-interview-session");
			const stub = env.INTERVIEW_SESSION.get(id);

			// Forward the request to that specific Durable Object instance.
			return stub.fetch(request);
		}

		// Otherwise, it's a request for a static asset (like our index.html).
		// Let the ASSETS binding handle serving the file.
		return env.ASSETS.fetch(request);
	},
};

// CRITICAL: We also need to export the Durable Object class from our main entrypoint file.
export { InterviewSession } from './InterviewSession';

