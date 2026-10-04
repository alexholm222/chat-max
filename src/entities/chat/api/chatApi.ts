import { apiClient } from "../../../shared/api";

export const getChatList = async ({ idInstance, apiTokenInstance }) => {
  const { data } = await apiClient.get(
    `waInstance${idInstance}/getChats/${apiTokenInstance}`
  );

  return data;
};

export const getAvatar = async ({
  idInstance,
  apiTokenInstance,
  chatId,
  signal,
}) => {
  const { data } = await apiClient.post(
    `waInstance${idInstance}/getAvatar/${apiTokenInstance}`,
    { chatId },
    { signal }
  );

  return data;
};

export const getLastMessage = async ({
  idInstance,
  apiTokenInstance,
  chatId,
  signal,
}) => {
  const { data } = await apiClient.post(
    `waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
    { chatId, count: 1 },
    { signal }
  );

  return data;
};

export const getLastIncomingMessages = async ({
  idInstance,
  apiTokenInstance,
  signal,
}) => {
  const { data } = await apiClient.get(
    `waInstance${idInstance}/lastIncomingMessages/${apiTokenInstance}`,
    {
      params: {
        minutes: 1440,
      },
      signal,
    }
  );

  return data;
};

export const getLastOutgoingMessages = async ({
  idInstance,
  apiTokenInstance,
  signal,
}) => {
  const { data } = await apiClient.get(
    `waInstance${idInstance}/lastOutgoingMessages/${apiTokenInstance}`,
    {
      params: {
        minutes: 1440,
      },
      signal,
    }
  );

  return data;
};

export const readChat = async ({
  idInstance,
  apiTokenInstance,
  chatId,
  idMessage,
}) => {
  const { data } = await apiClient.post(
    `/waInstance${idInstance}/readChat/${apiTokenInstance}`,
    {
      chatId,
      idMessage,
    }
  );

  return data;
};
