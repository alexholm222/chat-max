import { apiClient } from "../../../shared/api";

export const getContactInfo = async ({
  idInstance,
  apiTokenInstance,
  chatId
}) => {
  const { data } = await apiClient.post(
    `waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
    { chatId }
  );

  return data;
};
