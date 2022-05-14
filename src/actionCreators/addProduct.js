import { ADD_PRODUCT } from "./actions"

export const addProduct = payload => {
    return { type: ADD_PRODUCT, payload };
}