import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import useCart from '../../../hooks/useCart';

//Todo Provide publish Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Geteway_PK)

const Payment = () => {

    const [cart] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2));

    return (
        <div className='w-full'>
            <SectionTitle subHeading='plcase process' heading="Payment"></SectionTitle>

            <Elements stripe={stripePromise}>
                <CheckoutForm cart={cart} price={price}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;