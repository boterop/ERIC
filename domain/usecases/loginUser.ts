import { UserRepository, TokenService, StorageService } from "../ports";
import "react-native-get-random-values";
import bcrypt from "bcryptjs";

export const loginUser =
  (deps: {
    userRepo: UserRepository;
    tokenService: TokenService;
    storage: StorageService;
  }) =>
  async (email: string, password: string): Promise<string | null> => {
    const user = await deps.userRepo.findByEmail(email.trim().toLowerCase());
    if (!user) return null;

    const canAccess = await bcrypt.compare(password, user.password);

    if (!canAccess) return null;

    const token = await deps.tokenService.generateToken({
      email: user.email,
      name: user.name,
    });

    deps.storage.save("token", token);
    return token;
  };
