import { useQuery } from "@tanstack/react-query";
import { useInstanceStore } from "../../../entities/instance";
import { getMessages } from "../api/getMessages";

export const useChatMessages = (chatId: string) => {
  const { instance } = useInstanceStore((state) => state);
  return useQuery({
    queryKey: ["messages", instance?.idInstance, chatId],
    queryFn: ({ signal }) => getMessages({ ...instance, chatId, signal }),
    select: (messages) =>
      [...messages].sort((a, b) => a.timestamp - b.timestamp),
  });
};
