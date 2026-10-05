import { useCallback, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInstanceStore } from "../../instance";
import { readChat } from "../api/chatApi";
import type { MessageType } from "../../message";
import type { Chat } from "../model/types";

export const useReadChat = (chatId: string, messages: MessageType[] = []) => {
  const queryClient = useQueryClient();

  const { instance } = useInstanceStore((state) => state);

  const lastReadMessageId = useRef<string | null>(null);

  const chatsQueryKey = ["chat-list", instance?.idInstance];

  const mutation = useMutation({
    mutationFn: (idMessage: string) => {
      if (!instance?.idInstance || !instance.apiTokenInstance) {
        throw new Error("Instance is not configured");
      }

      return readChat({
        idInstance: instance.idInstance,
        apiTokenInstance: instance.apiTokenInstance,
        chatId,
        idMessage,
      });
    },

    onSuccess: (_data, idMessage) => {
      lastReadMessageId.current = idMessage;

      queryClient.setQueryData<Chat[]>(chatsQueryKey, (chats = []) =>
        chats.map((chat) =>
          chat.chatId === chatId
            ? {
                ...chat,
                unreadCount: 0,
              }
            : chat
        )
      );
    },
  });

  const markAsRead = useCallback(() => {
    const lastIncomingMessage = [...messages]
      .reverse()
      .find((message) => message.type === "incoming");

    if (!lastIncomingMessage) {
      return;
    }

    const { idMessage } = lastIncomingMessage;

    if (idMessage === lastReadMessageId.current) {
      return;
    }

    lastReadMessageId.current = idMessage;

    mutation.mutate(idMessage);
  }, [messages, mutation]);

  return {
    ...mutation,
    markAsRead,
  };
};
