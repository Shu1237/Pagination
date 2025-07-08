import { apiService } from "@/api/service";
import { QUERY_KEYS } from "@/utils/constants";
import type { MovieQueryType } from "@/utils/type";
import { useQuery } from "@tanstack/react-query";


export const useMovie = (body: MovieQueryType) => {
    return useQuery({
        queryKey: QUERY_KEYS.movies(body),
        queryFn: () => apiService.getMovies(body),
        staleTime: 1000 * 60 * 5,
    });
}