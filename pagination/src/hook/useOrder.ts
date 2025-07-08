import { apiService } from "@/api/service";
import { QUERY_KEYS } from "@/utils/constants";
import type {  OrderQueryType } from "@/utils/type";
import { useQuery } from "@tanstack/react-query";

export const useOrder = (body: OrderQueryType) => {
    return useQuery({
        queryKey: QUERY_KEYS.orders(body),
        queryFn: () => apiService.getOrders(body),
        staleTime: 1000 * 60 * 5,
    })
}

export const useOrderOverview = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.orderOverview],
        queryFn: () => apiService.getOverViewOrder(),
        staleTime: 1000 * 60 * 5,
    })
}