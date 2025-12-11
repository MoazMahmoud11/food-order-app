import { useContext, memo, useCallback } from 'react';
import {currencyFormatter} from '../util/formatting'; 
import Button from './UI/Button.jsx'
import CartContext from '../store/CartContext.jsx';
import { LazyLoadImage } from "react-lazy-load-image-component"; // *Perfect For Images
import "react-lazy-load-image-component/src/effects/blur.css";

function MealsItem({meal}) {
    const cartCtx = useContext(CartContext);

    const handleAddMealToCart = useCallback(() => {
    cartCtx.addItem(meal);
    }, [cartCtx, meal]);
    // `http://localhost:3000/${meal.image}` 
    return (
        <li className="meal-item">
            <article>
                <LazyLoadImage src={meal.image} alt={meal.name} width={300} height={200} loading='lazy' />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add to cart</Button>
                </p>
            </article>
        </li>
    )
}

export default memo(MealsItem);