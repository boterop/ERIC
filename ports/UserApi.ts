import { User } from "@/domain/User";

export interface UserApi {
  login(_email: string, _password: string): Promise<string | null>;
  register(_user: User): Promise<User | null>;
  me(_token: string): Promise<User | null>;
  students(_token: string): Promise<User[]>;
}
