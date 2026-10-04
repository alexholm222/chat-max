import type { QueryClient } from "@tanstack/react-query";

import type { IncomingMessageNotification } from "../../../shared/api/notifications/type";
import type { MessageType } from "./types";
import type { Chat } from "../../chat";

export const handleMessage = (
  notification: IncomingMessageNotification,
  queryClient: QueryClient
) => {
  const idInstance = String(notification.body.instanceData.idInstance);
  const { chatId } = notification.body.senderData;

  const message = {
    type: "incoming",
    chatId,
    chatType: notification.body.senderData.chatType,
    idMessage: notification.body.idMessage,
    timestamp: notification.body.timestamp,
    textMessage: notification.body.messageData.textMessageData.textMessage,
    typeMessage: notification.body.messageData.typeMessage,
    isForwarded: notification.body.messageData.textMessageData.isForwarded,
    forwardingScore:
      notification.body.messageData.textMessageData.forwardingScore,
    isEdited: false,
    isDeleted: false,
    senderName: notification.body.senderData.senderName,
    senderType: notification.body.senderData.senderType,
    senderContactName: notification.body.senderData.senderContactName,
  } satisfies MessageType;

  queryClient.setQueryData<MessageType[]>(
    ["messages", idInstance, chatId],
    (messages = []) => {
      if (messages.some((item) => item.idMessage === message.idMessage)) {
        return messages;
      }
      return [...messages, message];
    }
  );

  queryClient.setQueryData(["chat-last-message", idInstance, chatId], [message]);

  queryClient.setQueryData<Chat[]>(["chat-list", idInstance], (chats = []) => {
    const chat = chats.find((item) => item.chatId === chatId);

    if (!chat) {
      return chats;
    }

    const updatedChat = {
      ...chat,
      unreadCount: chat.unreadCount + 1,
    };

    return [updatedChat, ...chats.filter((item) => item.chatId !== chatId)];
  });
};
