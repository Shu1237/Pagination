import { API_CONFIG } from "./config";

export class BaseApi {
  protected createUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean>
  ): string {
    const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  protected buildQueryParams(
    params?: Record<string, any>
  ): Record<string, string | number | boolean> {
    const query: Record<string, string | number | boolean> = {};

    const page = params?.page ?? 1;
    const take = params?.take ?? 10;

    query.page = page;
    query.take = take;


    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          key !== "page" &&
          key !== "take"
        ) {
          query[key] = value;
        }
      });
    }

    return query;
  }

  protected async fetchData<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Request failed: ${res.status} - ${error}`);
    }
    return res.json() as Promise<T>;
  }
}
