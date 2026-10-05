import { apiClient } from "../../../shared/api";

interface SendMessagesParams {
  idInstance: string;
  apiTokenInstance: string;
  chatId: string;
  message: string;
}

export const sendMessage = async ({
  idInstance,
  apiTokenInstance,
  chatId,
  message,
}: SendMessagesParams) => {
  const { data } = await apiClient.post(
    `waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    { chatId, message }
  );

  return data;
};
