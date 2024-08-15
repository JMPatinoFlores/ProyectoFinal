import paypal from "@paypal/checkout-server-sdk";
import { NextRequest, NextResponse } from "next/server";

const clientId = process.env.PAYPAL_CLIENT_ID as string;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET as string;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req: NextRequest) {
  const request = new paypal.orders.OrdersCreateRequest();

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "1000.00",
        },
        description: "Alojamiento",
      },
    ],
  });

  const response = await client.execute(request);
  console.log(response);

  return NextResponse.json(
    {
      id: response.result.id,
    },
    {
      status: 201,
    }
  );
}
