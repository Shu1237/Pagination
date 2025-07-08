import type { OrderQueryType, OrderResponse, OverviewOrder, PaginatedResponse } from "@/utils/type";
import { BaseApi } from "./baseUrl";

class OrderApi extends BaseApi {
  async getOrders(params?: OrderQueryType): Promise<PaginatedResponse<OrderResponse>> {
    const queryParams = this.buildQueryParams(params);
    const url = this.createUrl("/order/admin", queryParams);
    return this.fetchData<PaginatedResponse<OrderResponse>>(url);
  }
  async getOrderOverview(): Promise<OverviewOrder> {
    const url = this.createUrl("/order/overview-order");
    return this.fetchData<OverviewOrder>(url);
  }
}

export const orderApi = new OrderApi();
