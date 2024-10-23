import Loading from "@/app/loading";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const StripePayment = ({ setToken }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setLoading(false);
    } else {
      setToken(paymentMethod.id);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {loading ? <Loading /> : null}
      <CardElement options={{ hidePostalCode: true }} />
      <button
        className="confirm_Order_Card_Button"
        type="submit"
        disabled={!stripe || loading}
      >
        USE CARD
      </button>
    </form>
  );
};

export default StripePayment;
