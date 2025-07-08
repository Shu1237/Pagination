
import axiosClient from "./axios";
import type { MovieQueryType, TicketQueryType, ScheduleQueryType, ActorQueryType, OrderQueryType, } from "@/utils/type";

export const apiService = {

  getMovies: (params: MovieQueryType) =>
    axiosClient.get("/movies/admin", { params }),

  getSchedules: (params: ScheduleQueryType) =>
    axiosClient.get("/schedules/admin", { params }),

  getTickets: (params: TicketQueryType) =>
    axiosClient.get("/ticket/admin", { params }),

  getActors: (params: ActorQueryType) =>
    axiosClient.get("/actor/admin", { params }),

  getOrders: (params: OrderQueryType) =>
    axiosClient.get("/order/admin", { params }),



  getOverViewTicket: () =>
    axiosClient.get("/ticket/overview-ticket"),

  getOverViewOrder: () =>
    axiosClient.get("/order/overview-order"),
};
