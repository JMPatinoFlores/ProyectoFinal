import GatewayPayment from "../PaymentGateaway";

function MessageConfirmBooking() {
  return (
    <div>
      <div className="mt-5 mb-5 flex justify-center font-medium text-[24px]">
        <h1>Confirmación de Reserva y Pago.</h1>
      </div>

      <div className="flex justify-center">
        <div className="max-w-[400px] min-w-[400px] bg-[#f1f1f1] px-4 py-3 rounded-lg">
          <h2 className="text-center font-medium text-[20px]">Detalles: </h2>
          <p>Hotel: </p>
          <p>CkechIn: </p>
          <p>CheckOut: </p>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <h2 className="text-[22px] font-medium">Proceder al Pago</h2>
      </div>
      <div className="flex justify-center mt-3">
        <GatewayPayment />
      </div>
    </div>
  );
}

export default MessageConfirmBooking;
