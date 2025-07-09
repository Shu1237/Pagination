import { useState, useEffect, useCallback, useRef } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

// Hook for managing debounced form inputs
export function useDebouncedParams<T extends Record<string, any>>(
    initialParams: T,
    delay: number = 2000,
    onParamsChange: (params: Partial<T>) => void
) {
    const [localParams, setLocalParams] = useState<T>(initialParams);
    const debouncedParams = useDebounce(localParams, delay);
    const onParamsChangeRef = useRef(onParamsChange);
    const isInitialMount = useRef(true);

    // Update ref on every render to ensure we have the latest callback
    useEffect(() => {
        onParamsChangeRef.current = onParamsChange;
    });

    // Sync local params with external params changes
    useEffect(() => {
        setLocalParams(initialParams);
    }, [initialParams]);

    // Update API params when debounced value changes
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        onParamsChangeRef.current(debouncedParams);
    }, [debouncedParams]);

    const updateLocalParam = useCallback((key: keyof T, value: any) => {
        setLocalParams(prev => ({
            ...prev,
            [key]: value === '' ? undefined : value,
            page: 1,
        }));
    }, []);
    return {
        localParams,
        updateLocalParam,
        setLocalParams
    };
}
