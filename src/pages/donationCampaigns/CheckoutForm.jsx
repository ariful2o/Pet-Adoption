import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/axios/useAxiosSecure";
import useUser from "../../hooks/userInfo/useUser";

const CheckoutForm = ({ amount, closeModal, maxDonationAmount, petName, campaignId, petPicture }) => {
  const axiosSecure = useAxiosSecure();
  const { displayName, email, } = useUser()
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [payId, setPayId] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { amount })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      });
  }, [axiosSecure, amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("Error creating card", error);
      setErrorMessage(error.message);
    } else {
      // console.log("Card created successfully", paymentMethod);
      setErrorMessage("");
    }

    //confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: displayName || "anonymous",
            email: email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error: " + confirmError);
    } else {
      // console.log("success", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setPayId(paymentIntent.id)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Payment Successfully Received",
          showConfirmButton: false,
          timer: 1500,
        });
        const paymentDetails = {
          email, campaignId, petPicture,
          donnerName: displayName,
          petName: petName,
          maxDonation: maxDonationAmount,
          currentDonation: amount,
          isPaused: false,
          donators: [
            { displayName, amount }
          ],
          transactionId: paymentIntent.id,
          time: new Date(),
          status: paymentIntent.status,
        };
        await axiosSecure.post("/paymentsucess", paymentDetails);
        // console.log(res.data,"Clear the cart");
        closeModal()
      }
    }
  }


  return (
    <div className="max-w-96 mx-auto">
      {/* <p>Total Pay : $ {amount}</p> */}
      <form onSubmit={handleSubmit}>
        <CardElement className="border p-4 rounded" />
        <button
          type="submit"
          disabled={!stripe}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4"
        >
          Donate ${amount}
        </button>
      </form>
      {errorMessage && <div className="text-red-500 mt-10">{errorMessage}</div>}
      {payId.id &&
        <p className="text-center text-green-700 mt-10">{payId.id}</p>
      }
    </div>
  );
};

export default CheckoutForm;

CheckoutForm.propTypes = {
  amount: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  maxDonationAmount: PropTypes.number.isRequired,
  petName: PropTypes.string.isRequired,
  campaignId: PropTypes.string.isRequired,
  petPicture: PropTypes.string.isRequired,
}