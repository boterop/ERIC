import { UniversityApi } from "@/ports/UniversityApi";
import { API_URL } from "@/config/api";

export const universityApi: UniversityApi = {
  search: async (country) => {
    const response = await fetch(
      `${API_URL}/universities?country=${country.toLowerCase().trim()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json.data;
  },
};
