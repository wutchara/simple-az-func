import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function helloTest(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  context.debug("========== DEBUG ==========");
  context.error("========== ERROR ==========");
  context.info("========== INFO ==========");
  context.log("========== LOG ==========");
  context.warn("========== WARN ==========");

  const name = request.query.get("name") || (await request.text()) || "world";

  return { body: `[HAM]: Hello, ${name}!` };
}

app.http("hello-test", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: helloTest,
});
