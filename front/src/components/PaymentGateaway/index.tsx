"use client"

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";



export default function GatewayPayment() {
  return (
    <div className="h-screen flex">
      <PayPalScriptProvider options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string
      }}>
        <PayPalButtons
          style={{
            color: "blue",
            layout: "horizontal",
          }}
          createOrder={async () => {
            const res = await fetch('/api/checkout', {
                method: "POST"
            }); 
            const order = await res.json()
            console.log(order)
            return order.id; 
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}