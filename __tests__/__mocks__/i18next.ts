jest.mock("react-i18next", () => {
  const en = require("@/lang/locales/en.json");

  return {
    useTranslation: () => ({
      t: (key: string) =>
        key.split(".").reduce((obj, k) => obj?.[k], en) ?? key,
    }),
  };
});
