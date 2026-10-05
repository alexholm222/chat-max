import { apiClient } from "../../../shared/api";

interface GetInstanceParams {
  idInstance: string;
  apiTokenInstance: string;
}

export const getInstance = async ({
  idInstance,
  apiTokenInstance,
}: GetInstanceParams) => {
  const { data } = await apiClient.get(
    `waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
  );

  return data;
};
