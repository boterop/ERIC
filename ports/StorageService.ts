export type StorageService = {
  save: (_key: string, _value: string) => Promise<void>;
  get: (_key: string) => Promise<string | null>;
};
