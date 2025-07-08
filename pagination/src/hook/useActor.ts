
import { apiService } from "@/api/service";
import { QUERY_KEYS } from "@/utils/constants";
import type { ActorQueryType } from "@/utils/type";
import { useQuery } from "@tanstack/react-query";




export const useActor = (body: ActorQueryType) => {
    return useQuery({
        queryKey: QUERY_KEYS.actors(body),
        queryFn: () => apiService.getActors(body),
        staleTime: 1000 * 60 * 5,
    });
};