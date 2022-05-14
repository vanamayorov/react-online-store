import { useRef, useState } from "react";

export default function useTimeout() {
    const [status, setStatus] = useState({ status: "", name: "" });
    const tm = useRef(null);

    const changeStatus = (message, name, ms) => {
        setStatus({ status: message, name });

        clearTimeout(tm.current);
        tm.current = setTimeout(() => setStatus({ status: "", name: "" }), ms);
    }

    return [status, changeStatus];
}