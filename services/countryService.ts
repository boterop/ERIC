import { countryApi } from "@/adapters/countryApi";

const adapter = countryApi;

const countryService = {
  list: async () => adapter.list(),
};

export default countryService;
