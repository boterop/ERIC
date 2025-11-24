import { University } from "@/domain/University";

export interface UniversityApi {
  search(country: string): Promise<University[]>;
}
