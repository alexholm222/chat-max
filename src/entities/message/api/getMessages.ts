import { apiClient } from "../../../shared/api";

export const getMessages = async ({
  idInstance,
  apiTokenInstance,
  chatId,
  signal,
}) => {
  const { data } = await apiClient.post(
    `waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
    { chatId },
    { signal }
  );

  return data;
};
