import {  type MovieQueryType, type MovieResponse, type PaginatedResponse } from "@/utils/type";
import { BaseApi } from "./baseUrl";

class MovieApi extends BaseApi {
  async getMovies(params?: MovieQueryType): Promise<PaginatedResponse<MovieResponse>> {
    const queryParams = this.buildQueryParams(params);
    const url =  this.createUrl("/movies/admin", queryParams);
    return this.fetchData<PaginatedResponse<MovieResponse>>(url)
  }
}

export const movieApi = new MovieApi();
