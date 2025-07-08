
import type { PaginatedResponse, ScheduleQueryType, ScheduleResponse } from "@/utils/type";
import { BaseApi } from "./baseUrl";


class ScheduleApi extends BaseApi {
  async getSchedules(params?: ScheduleQueryType): Promise<PaginatedResponse<ScheduleResponse>> {
    const queryParams = this.buildQueryParams(params);
    const url = this.createUrl("/schedules/admin", queryParams);
    return this.fetchData<PaginatedResponse<ScheduleResponse>>(url)
  }
}

export const scheduleApi = new ScheduleApi();
