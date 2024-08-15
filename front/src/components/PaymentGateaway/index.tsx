"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface GatewayPaymentProps {
  totalPayment: number;
}

function GatewayPayment({ totalPayment }: GatewayPaymentProps) {
  console.log("Pagoooo: ", totalPayment)
  return (
    <div className="h-screen flex">
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
        }}
      >
      <PayPalButtons
        style={{
          color: "blue",
          layout: "horizontal",
        }}
        createOrder={async () => {
          try {
            const res = await fetch("/api/checkout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
              body: JSON.stringify({ totalPayment: totalPayment.toString() }),
            });
        
            if (!res.ok) {
              throw new Error(`HTTP error status: ${res.status}`);
            }
        
            let order;
            try {
              order = await res.json();
            } catch (error) {
              console.error("Error parsing response as JSON:", error);
              return null;
            }
        
            console.log(order);
            return order.id;
          } catch (error) {
            console.error("Error creating order:", error);
            return null;
          }
        }}
        
      />
      </PayPalScriptProvider>
    </div>
  );
}

export default GatewayPayment;



// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// interface GatewayPaymentProps {
//   totalPayment: number;
// }

// function GatewayPayment({ totalPayment }: GatewayPaymentProps) {
//   console.log("Pagoooo: ", totalPayment)
//   return (
//     <div className="h-screen flex">
//       <PayPalScriptProvider
//         options={{
//           clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
//         }}
//       >
//         <PayPalButtons
//           style={{
//             color: "blue",
//             layout: "horizontal",
//           }}
//           createOrder={async () => {
//             const res = await fetch("/api/checkout", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ totalPayment }),
//             });
//             const order = await res.json();
//             console.log(order);
//             return order.id;
//           }}
//         />
//       </PayPalScriptProvider>
//     </div>
//   );
// }

// export default GatewayPayment;



// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// interface GatewayPaymentProps {
//   totalPayment: number;
// }

// function GatewayPayment({ totalPayment }: GatewayPaymentProps) {
//   return (
//     <div className="h-screen flex">
//       <PayPalScriptProvider
//         options={{
//           clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
//         }}
//       >
//         <PayPalButtons
//           style={{
//             color: "blue",
//             layout: "horizontal",
//           }}
//           createOrder={async () => {
//             const res = await fetch("/api/checkout", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ totalPayment }),
//             });
//             const order = await res.json();
//             console.log(order);
//             return order.id;
//           }}
//         />
//       </PayPalScriptProvider>
//     </div>
//   );
// }

// export default GatewayPayment;


// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


// interface GatewayPaymentProps {
//   totalPayment: number;
// }

// function GatewayPayment({ totalPayment }: GatewayPaymentProps) {
//   return (
//     <div className="h-screen flex">
//       <PayPalScriptProvider
//         options={{
//           clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
//         }}
//       >
//         <PayPalButtons
//           style={{
//             color: "blue",
//             layout: "horizontal",
//           }}
//           createOrder={async () => {
//             const res = await fetch("/api/checkout", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ totalPayment }),
//             });
//             const order = await res.json();
//             console.log(order);
//             return order.id;
//           }}
//         />
//       </PayPalScriptProvider>
//     </div>
//   );
// }

// export default GatewayPayment;



// function GatewayPayment() {
//   return (
//     <div className="h-screen flex">
//       <PayPalScriptProvider
//         options={{
//           clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
//         }}
//       >
//         <PayPalButtons
//           style={{
//             color: "blue",
//             layout: "horizontal",
//           }}
//           createOrder={async () => {
//             const res = await fetch("/api/checkout", {
//               method: "POST",
//             });
//             const order = await res.json();
//             console.log(order);
//             return order.id;
//           }}
//         />
//       </PayPalScriptProvider>
//     </div>
//   );
// }

// export default GatewayPayment;
