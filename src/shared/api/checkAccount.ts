import { apiClient } from "./apiClient";

export const checkAccount = async ({
  idInstance,
  apiTokenInstance,
  phoneNumber,
}) => {
  const { data } = await apiClient.post(
    `waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
    { phoneNumber }
  );

  return data;
};
