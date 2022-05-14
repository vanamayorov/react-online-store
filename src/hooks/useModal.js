import { useState } from "react";

export default function useModal() {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    return [open, setOpen, closeModal];
}