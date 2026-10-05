import { getContactInfo } from "../api/getContactInfo";
import { useQuery } from "@tanstack/react-query";
import { useInstanceStore } from "../../../entities/instance";

export const useGetContactInfo = (chatId: string) => {
  const { instance } = useInstanceStore((state) => state);

  return useQuery({
    queryKey: ["contact", instance?.idInstance, chatId],
    queryFn: () => {
      if (!instance?.idInstance || !instance.apiTokenInstance) {
        throw new Error("Instance is empiy");
      }
      return getContactInfo({ ...instance, chatId });
    },
    retry: false,
  });
};
