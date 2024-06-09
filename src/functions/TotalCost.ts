import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

interface IResponseMessage {
  message: string;
  result: any;
}

export async function TotalCost(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);
  context.log("Total Cost HTTP trigger function processed a request.");

  const body = (await request.json()) as Record<string, number>;
  const { quantity, unitPrice } = body;

  let responseStatusCode = 200;
  let responseMessageBody: IResponseMessage = { message: "OK", result: null };

  if (!quantity || !unitPrice) {
    responseStatusCode = 400;
    responseMessageBody.message =
      "Bad request! The quantity & unitPrice not provided!";
  } else {
    const totalCost = quantity * unitPrice;
    responseMessageBody.result = { totalCost };
  }

  const result: HttpResponseInit = {
    status: responseStatusCode,
    // headers: {
    //   contentType: "application/json",
    // },
    jsonBody: responseMessageBody,
    // body: JSON.stringify(responseMessageBody),
  };

  return result;
}

app.http("total-cost", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: TotalCost,
});
