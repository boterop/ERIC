import { UserApi } from "@/ports/UserApi";
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
      throw new Error((await response.json()).error);
    }

    return (await response.json()).data;
  },
  register: async (user) => {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    if (!response.ok) {
      const error = (await response.json()).errors;
      const key = Object.keys(error)[0];
      throw new Error(`${key} ${error[key]}`);
    }

    return (await response.json()).data;
  },
  me: async (token) => {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error((await response.json()).error);
    }

    return (await response.json()).data;
  },
};
