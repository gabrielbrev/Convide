import { useCallback, useState } from "react";

interface UseDebounceResult {
    debounce: (func: () => void) => void;
}

export function useDebounce(timeoutMs: number): UseDebounceResult {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>();

    const debounce = useCallback(
        (func: () => void) => {
            if (timeoutId) clearTimeout(timeoutId);

            const newTimeoutId = setTimeout(() => {
                func();
                setTimeoutId(null);
            }, timeoutMs);

            setTimeoutId(newTimeoutId);
        },
        [timeoutId]
    );

    return { debounce };
}
