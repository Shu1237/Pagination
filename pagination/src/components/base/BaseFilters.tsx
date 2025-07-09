import { useDebouncedParams } from "@/hook/useDebounce";

interface BaseFiltersProps<T extends Record<string, any>> {
  queryParams: T;
  onParamsChange: (params: Partial<T>) => void;
  children: (props: {
    localParams: T;
    updateLocalParam: (key: keyof T, value: any) => void;
    setLocalParams: (params: T) => void;
    hasPendingChanges: boolean;
  }) => React.ReactNode;
  delay?: number;
}

export default function BaseFilters<T extends Record<string, any>>({
  queryParams,
  onParamsChange,
  children,
  delay = 2000
}: BaseFiltersProps<T>) {
  const { localParams, updateLocalParam, setLocalParams } = useDebouncedParams(
    queryParams,
    delay,
    onParamsChange
  );

  const hasPendingChanges = JSON.stringify(localParams) !== JSON.stringify(queryParams);

  return (
    <>
      {children({
        localParams,
        updateLocalParam,
        setLocalParams,
        hasPendingChanges
      })}
    </>
  );
}
