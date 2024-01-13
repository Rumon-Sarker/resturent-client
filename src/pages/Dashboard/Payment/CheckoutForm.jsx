import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";


const CheckoutForm = ({ price, cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cartError, setCartError] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useAuth();
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');


    if (price > 0) {
        useEffect(() => {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {

                    setClientSecret(res.data.clientSecret)
                })

        }, [price, clientSecret])
    }

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (!stripe || !elements) {

            return;
        }


        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {

            setCartError(error.message);
        } else {
            setProcessing(true);

        }



        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'nothing',
                        name: user?.name || 'anonymous',

                    },
                },
            },
        );
        if (confirmError) {
            console.log(confirmError);
        }
        setProcessing(false)

        if (paymentIntent.status === 'succeeded') {

            setTransactionId(paymentIntent.id);

            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quntitay: cart.length,
                cartItems: cart.map(item => item._id),
                menuItems: cart.map(item => item.orderid),
                status: 'services pending',
                itemsNames: cart.map(item => item.name),

            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    if (res.data.result.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: 'Payment Successful',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })

        }


    }
    return (
        <>
            <form className="w-2/3 ml-16" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn ml-5 mt-5 btn-sm btn-success " type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {cartError && <p className="text-red-500 ml-5 mt-5">{cartError}</p>}
            {transactionId && <p className="text-green-500 ml-5 mt-5">Payment Success, TransactionId No: <span className="font-bold">{transactionId}</span></p>}
        </>
    );
};

export default CheckoutForm;