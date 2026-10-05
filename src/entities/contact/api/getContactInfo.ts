import { apiClient } from "../../../shared/api";

interface GetContactInfoParams {
  idInstance: string;
  apiTokenInstance: string;
  chatId: string;
}

export const getContactInfo = async ({
  idInstance,
  apiTokenInstance,
  chatId,
}: GetContactInfoParams) => {
  const { data } = await apiClient.post(
    `waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
    { chatId }
  );

  return data;
};
