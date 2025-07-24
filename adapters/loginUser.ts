import { UserApi, StorageService } from "../ports";
import "react-native-get-random-values";

export const loginUser =
  (deps: { userApi: UserApi; storage: StorageService }) =>
  async (email: string, password: string): Promise<string | null> => {
    const token = await deps.userApi.login(email, password);
    console.log(token);

    if (!token) return null;

    deps.storage.save("session", token);
    return token;
  };
