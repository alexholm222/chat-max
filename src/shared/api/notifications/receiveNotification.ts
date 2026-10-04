import { apiClient } from "../apiClient";

interface ReceiveNotificationParams {
  idInstance: string;
  apiTokenInstance: string;
  receiveTimeout?: number;
  signal?: AbortSignal;
}

export const receiveNotification = async ({
  idInstance,
  apiTokenInstance,
  receiveTimeout = 30,
  signal,
}: ReceiveNotificationParams) => {
  const { data } = await apiClient.get(
    `waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
    {
      params: {
        receiveTimeout,
      },
      signal,
    }
  );

  return data;
};