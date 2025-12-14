import { createContext, useReducer } from "react";


const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

function cartReducer(state, action){
    if (action.type === 'ADD_ITEM'){
        // state.items.push(action.payload); // not recommended => static update and the prev items removed
        const existingCartItemIndex = state.items.findIndex( 
            (item) => item.id === action.item.id);

        const updatedItems = [...state.items]; // array

        if (existingCartItemIndex > -1){

            const existingItem = state.items[existingCartItemIndex];

            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1, // undefined + 1 the object { type: 'ADD', item: { id: 5, name: "Book" } } => not have quantity attribute in all objects
            };
            updatedItems[existingCartItemIndex] = updatedItem; // 
        } else {
            updatedItems.push({...action.item, quantity: 1}); // the solution spread operator {...} add new item to the object in add_item (quantity: 1). 
            // action.item => action.payload the name changes just
    }

    return {...state, items: updatedItems};
    }

    if (action.type === 'REMOVE_ITEM'){
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1){
            updatedItems.splice(existingCartItemIndex, 1);
        }else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {...state, items: updatedItems};
    }

    if(action.type === 'CLEAR_CART'){
        return {...state, items: []}
    }

    return state;           
}

export function CartContextProvider({children}) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: [], });



    function addItem(item) {
        dispatchCartAction( {type: 'ADD_ITEM', item: item }); // item = payload || {item} just
    }

    function removeItem(id){
        dispatchCartAction( {type: 'REMOVE_ITEM', id});
    }

    function clearCart() {
        dispatchCartAction( {type: 'CLEAR_CART'});
    }

    const cartCtx = {
        items: cart.items,
        addItem: addItem,
        removeItem, // the same addItem value
        clearCart,
    };

    // console.log(cartCtx);

    return <CartContext.Provider value={cartCtx}>
        {children}
    </CartContext.Provider>
}

export default CartContext;

// const existingCartItemIndex = state.items.findIndex( 
//             (item) => item.id === action.id); 

//         const existingCartItem = state.items[existingCartItemIndex];

//         const updatedItems = [...state.items];

//         if (existingCartItem.quantity === 1){
//             updatedItems.splice(existingCartItemIndex, 1);
//         } else {
//             const updatedItem = {
//                 ...existingCartItem,
//                 quantity: existingCartItem.quantity - 1,
//             }
//             updatedItems[existingCartItemIndex] = updatedItem;
//         }

//         return {...state, items: updatedItems};