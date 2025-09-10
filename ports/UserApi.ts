import { User } from "@/domain/User";

export interface UserApi {
  login(email: string, password: string): Promise<string | null>;
  register(user: User): Promise<User | null>;
}
