import paypal from "@paypal/checkout-server-sdk";
// import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const clientId = process.env.PAYPAL_CLIENT_ID as string;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET as string;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  console.log('Request body:', data);

  const totalPayment = data.totalPayment;

  if (typeof totalPayment !== 'number' && isNaN(Number(totalPayment))) {
    console.error('Invalid total payment amount:', totalPayment);
    return NextResponse.json(
      {
        error: 'Invalid total payment amount',
      },
      {
        status: 400,
      }
    );
  }

  const request = new paypal.orders.OrdersCreateRequest();

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: totalPayment.toString(),
        },
        description: "Alojamiento",
      },
    ],
  });

  try {
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
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: 'Failed to create order',
      },
      {
        status: 500,
      }
    );
  }
}