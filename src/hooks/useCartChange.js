import { useContext } from "react";
import { addProduct } from "../actionCreators/addProduct";
import { deleteProduct } from "../actionCreators/deleteProduct";
import { CartContext } from "../store";
import useTimeout from "./useTimeout";

export default function useCartChange() {
    const { cart, dispatch } = useContext(CartContext);
    const [status, changeStatus] = useTimeout();

    const addToCart = productObj => {
        const code = productObj.code;
        let objInCart = cart[code];

        if (!objInCart) {
            objInCart = { ...productObj, number: 0 };
        }

        objInCart.number++;

        dispatch(addProduct({ [code]: objInCart }));

        changeStatus("added", productObj.name, 3000);
    };

    const addProductWithNum = productObj => {
        const code = productObj.code;
        dispatch(addProduct({ [code]: productObj }));
        changeStatus("added", productObj.name, 3000);
    }

    const deleteFromCart = productObj => {
        const code = productObj.code;
        const objInCart = cart[code];

        if (objInCart.number - 1 <= 0) delete cart[code];
        else --objInCart.number;

        dispatch(deleteProduct(cart[code] ? { [code]: objInCart } : null));

        changeStatus("deleted", productObj.name, 3000);
    };

    const clearSameProducts = productObj => {
        const code = productObj.code;
        delete cart[code];
        dispatch(addProduct(null));
        changeStatus("deleted", productObj.name, 3000);
    }

    return { cart, addToCart, deleteFromCart, addProductWithNum, clearSameProducts, status };
}