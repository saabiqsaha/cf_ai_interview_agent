// We need to import the Durable Object class we just created.
import { InterviewSession } from './InterviewSession';

// This defines the "environment" that Cloudflare provides to our Worker.
// It's how our code gets access to the Durable Object binding we configured in wrangler.jsonc.
export interface Env {
	INTERVIEW_SESSION: DurableObjectNamespace;
	AI: any; // This binding is for the Workers AI service.
}

export default {
	// The `fetch` method is the main entry point for all requests coming to our Worker.
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// For this app, we want every user to get a fresh, new interview session.
		// So, we create a new, random, unique ID for every single request that comes in.
		const id = env.INTERVIEW_SESSION.newUniqueId();

		// This is the magic part. We use the unique ID to get a "stub" for our
		// InterviewSession Durable Object. A stub is like a pointer or a remote control
		// to the actual object instance.
		const stub = env.INTERVIEW_SESSION.get(id);

		// Now, we simply forward the user's original request (e.g., to '/start')
		// to that specific Durable Object instance and return whatever it sends back.
		// The main worker doesn't need to know anything about the interview logic itself.
		return stub.fetch(request);
	},
};

// CRITICAL: We also need to export the Durable Object class from our main entrypoint file.
// This tells the Cloudflare runtime where to find the code for the "InterviewSession" class
// that we referenced by name in our wrangler.jsonc file. Without this, it won't work.
export { InterviewSession };

