import type { QueryClient } from "@tanstack/react-query";
import type { MessageStatusNotification } from "../../notifications/model/type";
import type { MessageType } from "./types";

export const handleMessageStatus = (
  notification: MessageStatusNotification,
  queryClient: QueryClient
) => {
  const { idInstance } = notification.body.instanceData;
  const { chatId, idMessage, status } = notification.body;

  queryClient.setQueryData<MessageType[]>(
    ["messages", String(idInstance), chatId],
    (messages = []) =>
      messages.map((message) =>
        message.idMessage === idMessage
          ? {
              ...message,
              statusMessage: status,
            }
          : message
      )
  );
};
