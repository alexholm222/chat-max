import { getChatList } from "../../../entities/chat";
import { useQuery } from "@tanstack/react-query";
import { useInstanceStore } from "../../../entities/instance";

export const useChatList = () => {
  const { instance } = useInstanceStore((state) => state);

  return useQuery({
    queryKey: ["chat-list", instance?.idInstance],
    queryFn: () => {
      if (!instance?.idInstance || !instance.apiTokenInstance) {
        throw new Error("Instance empity");
      }
      return getChatList(instance);
    },
  });
};
