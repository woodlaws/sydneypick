export default {
  async fetch(request, env) {
    if (!env.ASSETS?.fetch) return new Response("Static assets unavailable", { status: 503 });
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;
    const url = new URL(request.url);
    if (!url.pathname.includes(".") && !url.pathname.endsWith("/")) {
      url.pathname += ".html";
      const htmlResponse = await env.ASSETS.fetch(new Request(url, request));
      if (htmlResponse.status !== 404) return htmlResponse;
    }
    return response;
  },
};
