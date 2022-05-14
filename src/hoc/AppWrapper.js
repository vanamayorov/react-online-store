import { useReducer, useState } from 'react';
import useLocalStorage from "../hooks/useLocalStorage";
import cartReducer from '../reducers/cartReducer';
import { CartContext } from "../store";

const AppWrapper = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, useLocalStorage('cart'));
    const [data, setData] = useState({});
    const productsToShow = 6;

    const setValues = values => {
        setData(prev => ({
            ...prev,
            ...values
        }));
    }

    const clearData = () => setData({});

    return (
        <CartContext.Provider value={{ cart, dispatch, productsToShow, data, setValues, clearData }}>
            {children}
        </CartContext.Provider>
    );
}

export default AppWrapper;