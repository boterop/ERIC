import { UniversityApi } from "@/ports/UniversityApi";
import { API_URL } from "@/config/api";

export const universityApi: UniversityApi = {
  search: async (country) => {
    const response = await fetch(`${API_URL}/search?country=${country}`);

    if (!response.ok) {
      throw new Error((await response.json()).error);
    }

    return (await response.json()).data;
  },
};
