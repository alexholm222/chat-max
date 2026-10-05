import { apiClient } from "../../../shared/api";

interface GetMessagesParams {
  idInstance: string;
  apiTokenInstance: string;
  chatId: string;
  signal: AbortSignal;
}

export const getMessages = async ({
  idInstance,
  apiTokenInstance,
  chatId,
  signal,
}: GetMessagesParams) => {
  const { data } = await apiClient.post(
    `waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
    { chatId },
    { signal }
  );

  return data;
};
