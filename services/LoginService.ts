import { loginUser } from "../domain/usecases/loginUser";
import { userRepository } from "../infrastructure/users/UserRepository";
import { tokenService } from "../infrastructure/tokens/TokenService";
import { storageService } from "../infrastructure/storage/StorageService";

export const loginService = loginUser({
  userRepo: userRepository,
  tokenService: tokenService,
  storage: storageService,
});
