import { useState } from "react";

export default function useLocalStorage(key) {
    const [cart] = useState(localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : {});

    return cart;
}