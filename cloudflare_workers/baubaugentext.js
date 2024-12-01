export default {
    async fetch(request, env) {
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
            "Access-Control-Max-Age": "86400",
            "Access-Control-Allow-Headers": "Content-Type", // Add headers if necessary
        };

        // Handle OPTIONS requests for preflight
        if (request.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: corsHeaders,
            });
        }

        const url = new URL(request.url);
        const prompt = url.searchParams.get("prompt");

        if (!prompt) {
            return new Response(
                JSON.stringify({ error: "Please provide a 'prompt' query parameter." }),
                { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
            );
        }

        const messages = [
            { role: "system", content: "From now on, respond to all questions and conversations using metaphors, analogies, or references to granola bars. Every reply should relate to the flavors, textures, ingredients, or packaging of granola bars. For example, explain concepts as if they were about nuts, oats, honey, or the process of making granola bars." },
            {
                role: "user",
                content: prompt,
            },
        ];

        const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", { messages });

        return new Response(JSON.stringify(response), {
            headers: { "Content-Type": "application/json", ...corsHeaders },
        });
    },
};
