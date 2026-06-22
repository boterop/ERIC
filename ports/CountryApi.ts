import { Country } from "@/domain/Country";

export interface CountryApi {
  list(): Promise<Country[]>;
}
