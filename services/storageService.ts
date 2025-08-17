import { storageService as storage } from "@/adapters/storageService";

const storageService = {
  save: (key: string, value: string) => storage.save(key, value),
  get: (key: string) => storage.get(key),
  remove: (key: string) => storage.remove(key),
};

export default storageService;
