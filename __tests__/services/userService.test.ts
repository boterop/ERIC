import { User } from "@/domain/User";

// Unmock userService if it's mocked globally
jest.unmock("@/services/userService");

jest.mock("@/adapters/userApi", () => ({
  userApi: {
    login: jest.fn(),
    register: jest.fn(),
    me: jest.fn(),
    students: jest.fn(),
  },
}));

describe("userService", () => {
  // Import after mocks are set up
  let userService: any;
  let userApi: any;

  beforeAll(() => {
    userService = require("@/services/userService").default;
    userApi = require("@/adapters/userApi").userApi;
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("calls userApi login with correct credentials", async () => {
      (userApi.login as jest.Mock).mockResolvedValue("test-token");

      const result = await userService.login("test@example.com", "password123");

      expect(userApi.login).toHaveBeenCalledWith(
        "test@example.com",
        "password123",
      );
      expect(result).toBe("test-token");
    });

    it("throws error when login fails", async () => {
      (userApi.login as jest.Mock).mockRejectedValue(
        new Error("invalid_credentials"),
      );

      await expect(
        userService.login("wrong@example.com", "wrongpass"),
      ).rejects.toThrow("invalid_credentials");
    });

    it("returns token on successful login", async () => {
      const expectedToken = "session-token-123";
      (userApi.login as jest.Mock).mockResolvedValue(expectedToken);

      const result = await userService.login("user@test.com", "pass");

      expect(result).toBe(expectedToken);
    });
  });

  describe("register", () => {
    it("calls userApi register with user data", async () => {
      const user: User = {
        email: "newuser@example.com",
        password: "newpass123",
        name: "New User",
      };

      (userApi.register as jest.Mock).mockResolvedValue({
        id: "1",
        ...user,
      });

      const result = await userService.register(user);

      expect(userApi.register).toHaveBeenCalledWith(user);
      expect(result).toEqual({ id: "1", ...user });
    });

    it("throws error when registration fails", async () => {
      const user: User = {
        email: "invalid",
        password: "short",
        name: "User",
      };

      (userApi.register as jest.Mock).mockRejectedValue(
        new Error("email is invalid"),
      );

      await expect(userService.register(user)).rejects.toThrow(
        "email is invalid",
      );
    });

    it("returns user data on successful registration", async () => {
      const user: User = {
        email: "test@example.com",
        password: "password",
        name: "Test User",
      };

      const expectedResult = {
        id: "123",
        token: "new-token",
        ...user,
      };

      (userApi.register as jest.Mock).mockResolvedValue(expectedResult);

      const result = await userService.register(user);

      expect(result).toEqual(expectedResult);
    });
  });

  describe("students", () => {
    it("calls userApi students with token", async () => {
      const students: User[] = [
        {
          id: "1",
          email: "student@example.com",
          name: "Student",
          type: "student",
        },
      ];
      (userApi.students as jest.Mock).mockResolvedValue(students);

      const result = await userService.students("test-token");

      expect(userApi.students).toHaveBeenCalledWith("test-token");
      expect(result).toEqual(students);
    });
  });
});
