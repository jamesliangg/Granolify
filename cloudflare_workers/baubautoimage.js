export default {
    async fetch(request, env) {
        // Extract the prompt from the URL's query parameters
        const url = new URL(request.url);
        const prompt = url.searchParams.get('prompt') || "granola bar lying down on a map of North America"; // Default prompt if not provided

        const inputs = {
            prompt: prompt,
        };

        const response = await env.AI.run(
            "@cf/stabilityai/stable-diffusion-xl-base-1.0",
            inputs
        );

        return new Response(response, {
            headers: {
                "content-type": "image/jpg",
            },
        });
    },
};
