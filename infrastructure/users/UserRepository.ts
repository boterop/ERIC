import { UserRepository } from "../../domain/ports/UserRepository";
import { User } from "../../domain/entities/User";

const users: User[] = [
  {
    email: "test@example.com",
    password: "$2b$10$TWYC9dJfzHv54m5zwV0oUu39OTIYU6mHmyK9DJclJTx8kP8ZdHuIG", // 123456
    name: "Test User",
  },
];

export const userRepository: UserRepository = {
  findByEmail: (email) => users.find((u) => u.email === email),
};
