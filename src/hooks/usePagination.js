import { useMemo } from "react";

export default function usePagination(totalPages) {
    let pagesArr = useMemo(() => {
        const arr = [];
        for (let i = 1; i <= totalPages; i++) {
            arr.push(i);
        }
        return arr;
    }, [totalPages]);

    return pagesArr;
}