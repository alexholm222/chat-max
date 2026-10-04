import { apiClient } from "../../../shared/api";

export const sendMessage = async ({
  idInstance,
  apiTokenInstance,
  chatId,
  message,
}) => {
  const { data } = await apiClient.post(
    `waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    { chatId, message },
  
  );

  return data;
};
