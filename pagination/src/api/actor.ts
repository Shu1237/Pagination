import type { ActorQueryType, ActorResponse, PaginatedResponse } from "@/utils/type";
import { BaseApi } from "./baseUrl";

class ActorApi extends BaseApi {
  async getActors(params?: ActorQueryType): Promise<PaginatedResponse<ActorResponse>> {
    const queryParams = this.buildQueryParams(params);
    const url = this.createUrl("/actor/admin", queryParams);
    return this.fetchData<PaginatedResponse<ActorResponse>>(url);
  }
}

export const actorApi = new ActorApi();
