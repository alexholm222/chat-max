import type { QueryClient } from "@tanstack/react-query";
import { handleMessage } from "../../entities/message";
import { handleMessageStatus } from "../../entities/message";
import type {
  IncomingMessageNotification,
  MessageStatusNotification,
  Notification,
} from "../../shared/api/notifications/type";

const isIncomingMessageNotification = (
  notification: Notification
): notification is IncomingMessageNotification => {
  return notification.body.typeWebhook === "incomingMessageReceived";
};

const isMessageStatusNotification = (
  notification: Notification
): notification is MessageStatusNotification => {
  return notification.body.typeWebhook === "outgoingMessageStatus";
};

export const notificationRouter = (
  notification: Notification,
  queryClient: QueryClient
) => {
  if (isIncomingMessageNotification(notification)) {
    handleMessage(notification, queryClient);
    return;
  }

  if (isMessageStatusNotification(notification)) {
    handleMessageStatus(notification, queryClient);
  }
};
