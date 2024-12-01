export default {
    async fetch(request, env) {
        // Extract the URL from query parameters
        const url = new URL(request.url).searchParams.get("url");

        // If no URL is provided, return an error response
        if (!url) {
            return new Response(
                JSON.stringify({ error: "Please provide a 'url' query parameter." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        try {
            // Fetch the image from the provided URL
            const res = await fetch(url);

            // Handle errors from the fetch call
            if (!res.ok) {
                return new Response(
                    JSON.stringify({ error: `Failed to fetch image: ${res.statusText}` }),
                    { status: res.status, headers: { "Content-Type": "application/json" } }
                );
            }

            const blob = await res.arrayBuffer();

            // Input for the AI model
            const input = {
                image: [...new Uint8Array(blob)],
                prompt: "Generate a caption for this image",
                max_tokens: 512,
            };

            // Run the AI model
            const response = await env.AI.run("@cf/llava-hf/llava-1.5-7b-hf", input);

            // Return the AI response
            return new Response(JSON.stringify(response), {
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            // Handle unexpected errors
            return new Response(
                JSON.stringify({ error: `An error occurred: ${error.message}` }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }
    },
};
