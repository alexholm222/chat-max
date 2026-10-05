import { apiClient } from "../../../shared/api";

interface InstanceParams {
  idInstance: string;
  apiTokenInstance: string;
}

interface ChatParams extends InstanceParams {
  chatId: string;
}

interface ChatRequestParams extends ChatParams {
  signal: AbortSignal;
}

interface ReadChatParams extends ChatParams {
  idMessage: string;
}

export const getChatList = async ({
  idInstance,
  apiTokenInstance,
}: InstanceParams) => {
  const { data } = await apiClient.get(
    `waInstance${idInstance}/getChats/${apiTokenInstance}`,
  );

  return data;
};

export const getAvatar = async ({
  idInstance,
  apiTokenInstance,
  chatId,
  signal,
}: ChatRequestParams) => {
  const { data } = await apiClient.post(
    `waInstance${idInstance}/getAvatar/${apiTokenInstance}`,
    { chatId },
    { signal },
  );

  return data;
};

export const getLastMessage = async ({
  idInstance,
  apiTokenInstance,
  chatId,
  signal,
}: ChatRequestParams) => {
  const { data } = await apiClient.post(
    `waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
    { chatId, count: 1 },
    { signal },
  );

  return data;
};

export const getLastIncomingMessages = async ({
  idInstance,
  apiTokenInstance,
  signal,
}: InstanceParams & { signal: AbortSignal }) => {
  const { data } = await apiClient.get(
    `waInstance${idInstance}/lastIncomingMessages/${apiTokenInstance}`,
    {
      params: {
        minutes: 1440,
      },
      signal,
    },
  );

  return data;
};

export const getLastOutgoingMessages = async ({
  idInstance,
  apiTokenInstance,
  signal,
}: InstanceParams & { signal: AbortSignal }) => {
  const { data } = await apiClient.get(
    `waInstance${idInstance}/lastOutgoingMessages/${apiTokenInstance}`,
    {
      params: {
        minutes: 1440,
      },
      signal,
    },
  );

  return data;
};

export const readChat = async ({
  idInstance,
  apiTokenInstance,
  chatId,
  idMessage,
}: ReadChatParams) => {
  const { data } = await apiClient.post(
    `/waInstance${idInstance}/readChat/${apiTokenInstance}`,
    {
      chatId,
      idMessage,
    },
  );

  return data;
};