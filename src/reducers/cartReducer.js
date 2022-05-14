import { ADD_PRODUCT, CLEAR_CART, DELETE_PRODUCT } from "../actionCreators/actions";

const cartReducer = (state, action) => {
    let newState = null;
    switch (action.type) {
        case ADD_PRODUCT:
            newState = { ...state, ...action.payload };
            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        case DELETE_PRODUCT:
            newState = { ...state, ...action.payload };
            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        case CLEAR_CART:
            newState = {};
            localStorage.setItem('cart', JSON.stringify(newState));
            return newState;
        default:
            return state;
    }
}

export default cartReducer;