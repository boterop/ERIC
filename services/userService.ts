import { userApi } from "@/adapters/userApi";

const userService = {
  login: async (email: string, password: string) =>
    userApi.login(email, password),
  register: async (name: string, email: string, password: string) =>
    userApi.register(name, email, password),
};

export default userService;
