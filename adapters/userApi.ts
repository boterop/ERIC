import { UserApi } from "@/ports/UserApi";
import { User } from "@/domain/User";
import { API_URL } from "@/config/api";

export const userApi: UserApi = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()).data;
  },
  register: async (name, email, password) => {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          name,
          email,
          password,
        },
      }),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()).data;
  },
};
