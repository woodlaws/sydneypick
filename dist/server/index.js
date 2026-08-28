export default {
  async fetch(request, env) {
    if (env?.ASSETS) {
      const response = await env.ASSETS.fetch(request);
      if ((response.headers.get("content-type") || "").includes("text/html")) {
        const origin = new URL(request.url).origin;
        const html = (await response.text()).replaceAll("__OG_IMAGE__", origin + "/public/og.png");
        return new Response(html, response);
      }
      return response;
    }
    return new Response("Site assets unavailable", { status: 503 });
  }
};
