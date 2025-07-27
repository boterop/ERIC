jest.mock("@/lang", () => ({
  language: "en",
  changeLanguage: jest.fn(),
}));
