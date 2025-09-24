import { userApi } from "@/adapters/userApi";
import { User } from "@/domain/User";

const userService = {
  login: async (email: string, password: string) =>
    userApi.login(email, password),
  register: async (user: User) => userApi.register(user),
};

export default userService;
