import { useQueryClient } from "@tanstack/react-query";
import { useInstanceStore } from "../../instance";
import { useChatLastMessages } from "./useChatLastMessages";

export const useChatLastMessage = (chatId: string) => {
  const queryClient = useQueryClient();
  const { instance } = useInstanceStore((state) => state);

  const query = useChatLastMessages();

  const queryKey = [
    "chat-last-message",
    instance?.idInstance,
    chatId,
  ];

  const cachedMessage = queryClient.getQueryData(
    queryKey,
  )?.[0];

  if (!cachedMessage) {
    const message = query.data?.get(chatId);

    if (message) {
      queryClient.setQueryData(queryKey, [message]);
    }

    return {
      ...query,
      data: message,
    };
  }

  return {
    ...query,
    data: cachedMessage,
  };
};