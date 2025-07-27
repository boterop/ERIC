jest.mock("react-i18next", () => {
  const en = require("@/lang/locales/en.json");

  return {
    useTranslation: () => ({
      t: (key: string) => (en as Record<string, string>)[key] ?? key,
    }),
  };
});
