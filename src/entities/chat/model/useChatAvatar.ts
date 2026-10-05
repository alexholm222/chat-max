import { getAvatar } from "../api/chatApi";
import { useQuery } from "@tanstack/react-query";
import { useInstanceStore } from "../../../entities/instance";
import { requestQueue } from "../../../shared/model";

export const useChatAvatar = (chatId: string) => {
  const { instance } = useInstanceStore((state) => state);
  return useQuery({
    queryKey: ["chat-avatar", instance?.idInstance, chatId],
    queryFn: ({ signal }) =>
      requestQueue.add(() => {
        if (!instance?.idInstance || !instance.apiTokenInstance) {
          throw new Error("Instance empity");
        }
        return getAvatar({ ...instance, chatId, signal });
      }),
    retry: false,
    staleTime: 60 * 60 * 1000,
  });
};
