import { loginUser } from "@/domain/usecases/loginUser";
import { userRepository } from "@/infrastructure/users/UserRepository";
import { sessionService } from "@/infrastructure/tokens/SessionService";
import { storageService } from "@/infrastructure/storage/StorageService";

export const loginService = loginUser({
  userRepo: userRepository,
  sessionService: sessionService,
  storage: storageService,
});
