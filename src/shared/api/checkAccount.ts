import { apiClient } from "./apiClient";

interface CheckAccountParams {
  idInstance: string;
  apiTokenInstance: string;
  phoneNumber: string;
}

export const checkAccount = async ({
  idInstance,
  apiTokenInstance,
  phoneNumber,
}: CheckAccountParams) => {
  const { data } = await apiClient.post(
    `waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
    { phoneNumber }
  );

  return data;
};
