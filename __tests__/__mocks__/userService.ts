import { User } from "@/domain/User";

const users: User[] = [];

jest.mock("@/services/userService", () => ({
  login: jest.fn(async (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password,
    );
    if (!user) throw new Error("invalid_credentials");
    return `session-${email}-${password}`;
  }),
  register: jest.fn((name, email, password) =>
    Promise.resolve(users.push({ name, email, password })),
  ),
}));
