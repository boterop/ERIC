import { CountryApi } from "@/ports";
import { API_URL } from "@/config/api";

export const countryApi: CountryApi = {
  list: async () => {
    const response = await fetch(`${API_URL}/countries`);

    if (!response.ok) {
      throw new Error((await response.json()).error);
    }

    return response.json();
  },
};
