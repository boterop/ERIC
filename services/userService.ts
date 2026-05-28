import { userApi } from "@/adapters/userApi";
import { User } from "@/domain/User";

const userService = {
  login: async (email: string, password: string) =>
    userApi.login(email, password),
  register: async (user: User) => userApi.register(user),
  me: async (token: string) => userApi.me(token),
  students: async (token: string) => userApi.students(token),
};

export default userService;
