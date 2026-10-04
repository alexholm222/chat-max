import { apiClient } from "../../../shared/api";

export const getInstance = async ({idInstance, apiTokenInstance}) => {
  const { data } = await apiClient.get(
    `waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
  );

  return data;
};

