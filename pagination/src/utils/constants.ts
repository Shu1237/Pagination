import type { ActorQueryType, MovieQueryType, OrderQueryType, ScheduleQueryType, TicketQueryType } from "./type";


export const QUERY_KEYS = {
  actors: (params?: ActorQueryType) => ["actors", params] as const,
  movies: (params?: MovieQueryType) => ["movies", params] as const,
  tickets: (params?: TicketQueryType) => ["tickets", params] as const,
  schedules: (params?: ScheduleQueryType) => ["schedules", params] as const,
  orders:(param?:OrderQueryType) => ["orders", param] as const,



  ticketOverview: ["ticketOverview"] as const,
  orderOverview: ["orderOverview"] as const,

} as const;