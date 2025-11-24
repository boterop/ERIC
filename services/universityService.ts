import { universityApi } from "@/adapters/universityApi";

const universityService = {
  search: async (country: string) => universityApi.search(country),
};

export default universityService;
