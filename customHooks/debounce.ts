import { useEffect, useRef, useState } from "react";

export default function useDebounce(value:any, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState("");
    const timerRef = useRef<any>();

    useEffect(() => {
        timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [value, delay]);

    return debouncedValue;
};