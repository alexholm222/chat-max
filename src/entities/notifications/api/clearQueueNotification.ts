import { apiClient } from "../../../shared/api";

interface ClearQueueNotificationParams {
  idInstance: string;
  apiTokenInstance: string;
}

export const clearQueueNotification = async ({
  idInstance,
  apiTokenInstance,
}: ClearQueueNotificationParams) => {
  const { data } = await apiClient.delete(
    `waInstance${idInstance}/clearWebhooksQueue/${apiTokenInstance}`
  );

  return data;
};
