import { apiService } from "@/api/service";
import { QUERY_KEYS } from "@/utils/constants";
import type { TicketQueryType } from "@/utils/type";
import { useQuery } from "@tanstack/react-query";



export const useTicket =(body:TicketQueryType)=>{
   return useQuery({
        queryKey: [QUERY_KEYS.tickets, body],
        queryFn: () => apiService.getTickets(body),
        staleTime: 1000 * 60 * 5,
    });
}
export const useTicketOverview = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.ticketOverview],
        queryFn: () => apiService.getOverViewTicket(),
        staleTime: 1000 * 60 * 5,
    });
}