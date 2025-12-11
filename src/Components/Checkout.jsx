import { useContext, useActionState  } from "react";

import useHttp from '../Hooks/useHttp.js';
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Error from './Error.jsx';
import Button from "./UI/Button.jsx";
import Input from "./UI/Input.jsx";
import Modal from "./UI/Modal.jsx";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const { data, error, sendRequest, clearData } =
        useHttp('https://6925873e82b59600d7240307.mockapi.io/FoodOrderAPI/orders', requestConfig); // 'http://localhost:3000/orders'

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    // function checkoutAction(prevState, formData) {

    //     const fullName = formData.get('full-name');
    //     const email = formData.get('email');
    //     const street = formData.get('street');
    //     const postalCode = formData.get('postal-code');
    //     const city = formData.get('city');

    //         let errors = [];

    //     if (!isNotEmpty(fullName)){
    //         errors.push('You must enter your name');
    //     }
    //     if(!email.includes(mailsRe)){
    //         errors.push('Invalid email address.');
    //     }

    //     // formData.submit();
    // }

    async function checkoutAction(prevState,fd) {
        const customerData = Object.fromEntries(fd.entries()); // {email: t@t.com

        await sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                },
            })
        );

    }

    const [formState, formAction, isSending] = useActionState(checkoutAction, null);

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>
    );


    if (isSending) {
        actions = <span>Sending order data...</span>;
    }

    if (data && !error) {
        return (
            <Modal
                open={userProgressCtx.progress === 'checkout'}
                onClose={handleFinish}
            >
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>
                    We will get back to you with more details via email within the next
                    few minutes.
                </p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form action={formAction}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name" />
                <Input label="E-Mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {error && <Error title='Failed to submit order' message={error} />}

                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
}
