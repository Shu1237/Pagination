import type { OverviewTicket, PaginatedResponse, TicketQueryType, TicketResponse } from "@/utils/type";
import { BaseApi } from "./baseUrl";

export class TicketApi extends BaseApi {
  async getTicket(params?: TicketQueryType): Promise<PaginatedResponse<TicketResponse>> {
    const queryParams = this.buildQueryParams(params);
    const url = this.createUrl("/ticket/admin", queryParams);
    return this.fetchData<PaginatedResponse<TicketResponse>>(url);
  }

  async getOverviewTicket(): Promise<OverviewTicket> {
    const url = this.createUrl("/ticket/overview-ticket");
    return this.fetchData<OverviewTicket>(url);

  }
}

export const ticketApi = new TicketApi();
