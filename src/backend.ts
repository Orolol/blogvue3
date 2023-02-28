const BASE_PATH = "http://localhost:3010/";
import { useAuthStore } from "@/stores/admin";

type header = {
  "content-type"?: string;
  Authorization?: string;
};

export const clientAPI = {
  getApi: async (
    path: string,
    payload?: any,
    auth: boolean = false,
    params?: any
  ) => {
    const token = useAuthStore().token;

    const request = fetch(BASE_PATH + path, {
      method: "get",
      headers: !auth
        ? {
            "Content-Type": "application/json",
          }
        : {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
    });
    return await requestSender(request);
  },
  postApi: async (path: string, payload?: any, auth: boolean = false) => {
    const token = useAuthStore().token;

    let body;
    const baseHeader: header = {};

    if (payload instanceof File || payload instanceof Blob) {
      const data = new FormData();
      data.append("file", payload);
      body = data;
      console.log("data", data);
    } else {
      body = JSON.stringify(payload);
      baseHeader["content-type"] = "application/json";
    }

    auth && (baseHeader.Authorization = "Bearer " + token);

    console.log("body", body);
    console.log("payload", payload);
    console.log("baseHeader", baseHeader);

    const request = fetch(BASE_PATH + path, {
      method: "POST",
      headers: baseHeader,
      body: body,
    });
    const data = await requestSender(request);
    return data;
  },
};

const requestSender = async (promise: Promise<any>) => {
  try {
    const response: Response = await promise;

    return await response
      .json()
      .then((data) => {
        if (response.status !== 200) {
          throw new Error(data.status);
        }
        return data;
      })
      .catch(() => {
        if (!response.ok) {
          console.log(response.status);
          if ([401, 403].includes(response.status)) {
            const error = new Error("Authentification error");
            useAuthStore().setToken("");
            return Promise.reject(error);
          } else {
            const error = new Error("Generic error");
            return Promise.reject(error);
          }
        }
      });
  } catch (e) {
    console.log(e);
  }
};
