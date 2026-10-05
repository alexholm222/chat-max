import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInstanceStore } from "../../../entities/instance";
import { sendMessage } from "../../../entities/message/api/sendMessage";
import type { MessageType } from "../../../entities/message";
import type { Chat } from "../../../entities/chat";

export const useSendMessage = (chatId: string) => {
  const queryClient = useQueryClient();
  const { instance } = useInstanceStore((state) => state);
  const queryKey = ["messages", instance?.idInstance, chatId];
  const chatsQueryKey = ["chat-list", instance?.idInstance];
  const chatsLastmessageQueryKey = [
    "chat-last-message",
    instance?.idInstance,
    chatId,
  ];

  return useMutation({
    mutationFn: (message: string) => {
      if (!instance?.idInstance || !instance.apiTokenInstance) {
        throw new Error("Instance is empity");
      }

      return sendMessage({
        idInstance: instance.idInstance,
        apiTokenInstance: instance.apiTokenInstance,
        chatId,
        message,
      });
    },

    onMutate: async (message) => {
      await queryClient.cancelQueries({
        queryKey,
      });
      const optimisticId = `optimistic-${crypto.randomUUID()}`;

      const optimisticMessage = {
        idMessage: optimisticId,
        timestamp: Math.floor(Date.now() / 1000),
        chatId,
        chatType: "user",
        type: "outgoing",
        typeMessage: "textMessage",
        textMessage: message,
        isForwarded: false,
        forwardingScore: 0,
        isEdited: false,
        isDeleted: false,
        statusMessage: "sent",
        sendByApi: true,
        isNew: true,
      } satisfies MessageType;

      queryClient.setQueryData<MessageType[]>(queryKey, (messages = []) => [
        ...messages,
        optimisticMessage,
      ]);

      return {
        optimisticId,
      };
    },

    onError: (_error, _message, context) => {
      if (!context?.optimisticId) {
        return;
      }

      queryClient.setQueryData<MessageType[]>(queryKey, (messages = []) =>
        messages.map((message) =>
          message.idMessage === context.optimisticId
            ? {
                ...message,
                sendStatus: "error",
              }
            : message
        )
      );
    },

    onSuccess: (data, message, context) => {
      if (!context?.optimisticId) {
        return;
      }

      const chats = queryClient.getQueryData<Chat[]>(chatsQueryKey) ?? [];

      const chatExists = chats.some((chat) => chat.chatId === chatId);

      if (!chatExists) {
        const contact = queryClient.getQueryData<{
          avatar: string;
          name: string;
          contactName: string;
          chatId: string;
          chatType: "user" | "group";
          phoneNumber: number;
        }>(["contact", instance?.idInstance, chatId]);

        if (contact) {
          const newChat: Chat = {
            chatId: contact?.chatId,
            name: contact?.name || contact?.contactName,
            phoneNumber: contact?.phoneNumber,
            type: contact?.chatType,
            unreadCount: 0,
          };

          queryClient.setQueryData<Chat[]>(chatsQueryKey, [newChat, ...chats]);
        }
      }

      queryClient.setQueryData<MessageType[]>(queryKey, (messages = []) =>
        messages.map((message) =>
          message.idMessage === context.optimisticId
            ? {
                ...message,
                idMessage: data.idMessage,
              }
            : message
        )
      );

      queryClient.setQueryData<Chat[]>(chatsQueryKey, (chats = []) =>
        chats.map((chat) =>
          chat.chatId === chatId
            ? {
                ...chat,
                lastMessage: { textMessage: message },
                timestamp: Math.floor(Date.now() / 1000),
              }
            : chat
        )
      );

      queryClient.setQueryData(chatsLastmessageQueryKey, [
        { typeMessage: "textMessage", textMessage: message },
      ]);

      queryClient.setQueryData<Chat[]>(chatsQueryKey, (chats = []) => {
        const chat = chats.find((item) => item.chatId === chatId);
        if (!chat) {
          return chats;
        }
        return [chat, ...chats.filter((item) => item.chatId !== chatId)];
      });
    },
  });
};
