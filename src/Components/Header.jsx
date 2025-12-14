import headerImg from '../assets/logo.jpg';
import CartContext from '../store/CartContext.jsx';
import {UserProgressContext} from '../store/UserProgressContext.jsx';
import Button from './UI/Button.jsx';
import { useContext } from 'react';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items?.reduce(
        (totalNumOfItems, item) => totalNumOfItems + (item.quantity || 0),
        0
    ) || 0;


    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={headerImg} alt='Header Image' />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
}