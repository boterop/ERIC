import { userApi } from "@/adapters/userApi";
import { testUserApi } from "@/adapters/testUserApi";
import { User } from "@/domain/User";

const userService = {
  login: async (email: string, password: string) => {
    const adapter = process.env.USER === "test" ? testUserApi : userApi;
    return adapter.login(email, password);
  },
  register: async (user: User) => {
    const adapter = process.env.USER === "test" ? testUserApi : userApi;
    return adapter.register(user);
  },
  me: async (token: string) => {
    const adapter = process.env.USER === "test" ? testUserApi : userApi;
    return adapter.me(token);
  },
  students: async (token: string) => {
    const adapter = process.env.USER === "test" ? testUserApi : userApi;
    return adapter.students(token);
  },
};

export default userService;
