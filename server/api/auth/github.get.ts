export default defineEventHandler(async (event) => {
  const resp = await event.fetch(
    "https://r.aya1.eu.org/https/github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: "7122f296ba2602fb0ff1",
        client_secret: "95d2307f6b17c7a6fff4ee1c54ad042fa56556dd",
        code: new URL(
          event.node.req.url!,
          `http://${event.node.req.headers.host}`
        ).searchParams.get("code"),
      }),
    }
  );
  const token = (await resp.formData()).get("access_token")?.toString();
  return token;
});
