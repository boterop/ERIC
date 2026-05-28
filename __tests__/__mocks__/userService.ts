import { User } from "@/domain/User";

const users: User[] = [];
const professor: User = {
  id: "professor-1",
  email: "professor@test.com",
  name: "Professor",
  type: "professor",
};

jest.mock("@/services/userService", () => ({
  login: jest.fn(async (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password,
    );
    if (!user) throw new Error("invalid_credentials");
    return `session-${email}-${password}`;
  }),
  register: jest.fn((user) => Promise.resolve(users.push(user))),
  me: jest.fn(() => Promise.resolve(professor)),
  students: jest.fn(() =>
    Promise.resolve(users.filter((u) => u.type === "student")),
  ),
}));
