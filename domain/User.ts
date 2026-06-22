export interface User {
  id?: string;
  email: string;
  password?: string;
  name: string;
  type?: "student" | "professor";
  country?: string;
  institution?: string;
  age?: number;
}
