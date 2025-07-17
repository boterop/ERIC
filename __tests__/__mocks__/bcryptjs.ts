jest.mock("bcryptjs", () => ({
  compare: jest.fn(() => Promise.resolve(true)),
}));
