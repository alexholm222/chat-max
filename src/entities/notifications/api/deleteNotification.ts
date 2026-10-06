import { apiClient } from "../../../shared/api";

interface DeleteNotificationParams {
  idInstance: string;
  apiTokenInstance: string;
  receiptId: number;
}

export const deleteNotification = async ({
  idInstance,
  apiTokenInstance,
  receiptId,
}: DeleteNotificationParams) => {
  const { data } = await apiClient.delete(
    `waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
  );

  return data;
};
