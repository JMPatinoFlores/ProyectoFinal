import BookingForm from "@/components/BookingForm";
import GatewayPayment from "@/components/PaymentGateaway";

function Booking() {
  return (
    <div>
      <BookingForm />
      <GatewayPayment />
    </div>
  );
}
export default Booking;
