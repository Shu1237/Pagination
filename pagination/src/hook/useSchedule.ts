import { apiService } from "@/api/service";
import { QUERY_KEYS } from "@/utils/constants";
import type { ScheduleQueryType } from "@/utils/type";
import { useQuery } from "@tanstack/react-query"



export const useSchedule = (body: ScheduleQueryType) => {
    return useQuery({
           queryKey: QUERY_KEYS.schedules(body),
           queryFn: () => apiService.getSchedules(body),
           staleTime: 1000 * 60 * 5,
       });
 
}