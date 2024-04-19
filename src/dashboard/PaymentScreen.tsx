import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import { BackButton } from "./BackButton";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

interface Props {
    goBackToDash: () => void;
    
 }

 

export const CheckoutForm: React.FC = () => {
    const location = useLocation();
    const { goBackToDash } = location.state as Props;
    // Make sure to call `loadStripe` outside of a component’s render to avoid
    // recreating the `Stripe` object on every render.
    // This is your test public API key.
    const stripePromise = loadStripe("pk_test_51OxoiHRpl1Mrfk4hQ0QlsOu6Jq6UzTtJ5vfr2YT4Y8mV3x6X4JuyQSKgULTf6ue06uyH1XltgvwkeUMXBRJH2sZp00ZQoJaDHV");
    const serverAddress = import.meta.env.VITE_APP_BACKEND_ADDRESS;

    const fetchClientSecret = useCallback(async () => {
        try {
          const response = await fetch(serverAddress + "/api/payment/create", {
            method: "POST",
          });
          const data = await response.json();
          console.log(data); // Log the data received
          console.log(data.clientSecret); // Log the client secret
          return data.clientSecret;
        } catch (error) {
          console.error(error);
          // Handle any errors here
        }
      }, []);
  
    const options = {fetchClientSecret};
  
    return (
        <>
            <BackButton goBackToDash={goBackToDash}/>
            <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div id="checkout">
                    <div >
                        <EmbeddedCheckoutProvider
                            stripe={stripePromise}
                            options={options}
                        >
                            <EmbeddedCheckout />
                        </EmbeddedCheckoutProvider>
                    </div>
                </div>
            </div>
        </>
    )
}
  
export const Return: React.FC<Props> = ({goBackToDash}) => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        fetch(serverAddress + `/api/payment/session-status?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
            setStatus(data.status);
            setCustomerEmail(data.customer_email);
        });
    }, []);

    if (status === 'open') {
        return (
            goBackToDash()
          //setPage('paymentreturn')
        )
    }

    if (status === 'complete') {
        return (
        <section id="success">
            <p>
            We appreciate your business! A confirmation email will be sent to {customerEmail}.

            If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
            </p>
        </section>
        )
    }

    return null;
}