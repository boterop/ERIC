import { SessionService } from "../../domain/ports/SessionService";
import { randomUUID } from "expo-crypto";

export const sessionService: SessionService = {
  create: async (email) => {
    const sessionId = randomUUID();
    return sessionId;
  },
};
