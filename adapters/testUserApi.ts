import { UserApi } from "@/ports";
import { User } from "@/domain/User";

const users: User[] = [
  {
    id: "1",
    email: "test@test.com",
    password: "test",
    name: "Test",
    type: "student",
    country: "Brazil",
    institution: "UFMG",
    age: 20,
  },
];

export const testUserApi: UserApi = {
  login: async (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) throw new Error("Not found");

    return user.email;
  },
  register: async (user) => {
    users.push(user);
    return user;
  },
  me: async (token) => {
    const user = users.find((u) => u.email === token);

    if (!user) throw new Error("Not found");

    return user;
  },
  students: async (token) => {
    const user = users.find((u) => u.email === token);

    if (!user) throw new Error("Not found");

    return users.filter((u) => u.type === "student");
  },
};
