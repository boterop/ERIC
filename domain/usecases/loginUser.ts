import { UserRepository, SessionService, StorageService } from "../ports";
import "react-native-get-random-values";
import bcrypt from "bcryptjs";

export const loginUser =
  (deps: {
    userRepo: UserRepository;
    sessionService: SessionService;
    storage: StorageService;
  }) =>
  async (email: string, password: string): Promise<string | null> => {
    const user = await deps.userRepo.findByEmail(email.trim().toLowerCase());
    if (!user) return null;

    const canAccess = await bcrypt.compare(password, user.password);

    if (!canAccess) return null;

    const token = await deps.sessionService.create(user.email);

    deps.storage.save("session", token);
    return token;
  };
