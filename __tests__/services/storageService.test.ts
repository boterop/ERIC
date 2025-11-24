import storageService from "@/services/storageService";
import { storageService as adapter } from "@/adapters/storageService";

jest.mock("@/adapters/storageService", () => ({
  storageService: {
    save: jest.fn(),
    get: jest.fn(),
    remove: jest.fn(),
  },
}));

describe("storageService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("save", () => {
    it("calls adapter save with correct parameters", async () => {
      await storageService.save("test-key", "test-value");

      expect(adapter.save).toHaveBeenCalledWith("test-key", "test-value");
    });

    it("returns promise from adapter", async () => {
      (adapter.save as jest.Mock).mockResolvedValue(undefined);

      const result = await storageService.save("key", "value");

      expect(result).toBeUndefined();
    });
  });

  describe("get", () => {
    it("calls adapter get with correct key", async () => {
      (adapter.get as jest.Mock).mockResolvedValue("stored-value");

      const result = await storageService.get("test-key");

      expect(adapter.get).toHaveBeenCalledWith("test-key");
      expect(result).toBe("stored-value");
    });

    it("returns null when key does not exist", async () => {
      (adapter.get as jest.Mock).mockResolvedValue(null);

      const result = await storageService.get("non-existent-key");

      expect(result).toBeNull();
    });
  });

  describe("remove", () => {
    it("calls adapter remove with correct key", async () => {
      await storageService.remove("test-key");

      expect(adapter.remove).toHaveBeenCalledWith("test-key");
    });

    it("returns promise from adapter", async () => {
      (adapter.remove as jest.Mock).mockResolvedValue(undefined);

      const result = await storageService.remove("key");

      expect(result).toBeUndefined();
    });
  });
});
