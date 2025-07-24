import { loginUser } from "@/adapters/loginUser";
import { userApi } from "@/adapters/userApi";
import { storageService } from "@/adapters/storageService";

export const loginService = loginUser({
  userApi: userApi,
  storage: storageService,
});
