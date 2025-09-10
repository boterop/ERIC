export interface User {
  email: string;
  password: string;
  name: string;
  type: "student" | "professor";
  country: string;
  institution: string;
  age: number;
}
