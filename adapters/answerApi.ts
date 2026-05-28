import { AnswerApi } from "@/ports";
import { API_URL } from "@/config/api";

export const answerApi: AnswerApi = {
  get: async (id, token) => {
    const response = await fetch(`${API_URL}/answers/${id}`, {
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
  create: async (answer, token) => {
    const response = await fetch(`${API_URL}/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ answer }),
    });

    if (!response.ok) {
      throw new Error((await response.json()).error);
    }

    return (await response.json()).data;
  },
  update: async (answer, token) => {
    const response = await fetch(`${API_URL}/answers/${answer.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ answer }),
    });

    if (!response.ok) {
      throw new Error((await response.json()).error);
    }

    return (await response.json()).data;
  },
  listByDimension: async (dimension, token, userId) => {
    const query = userId ? `?user_id=${encodeURIComponent(userId)}` : "";
    const response = await fetch(
      `${API_URL}/answers/dimension/${dimension}${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error((await response.json()).error);
    }

    return (await response.json()).data;
  },
};
