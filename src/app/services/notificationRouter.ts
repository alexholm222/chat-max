import type { QueryClient } from "@tanstack/react-query";

import { handleStateInstanceChanged } from "../../entities/instance";
import { handleMessage } from "../../entities/message";
import { handleMessageStatus } from "../../entities/message";

export const notificationRouter = (notification, queryClient: QueryClient) => {
   
  switch (notification.body.typeWebhook) {
   
    case "incomingMessageReceived":
      handleMessage(notification, queryClient);
      break;

    case "outgoingMessageStatus":
      handleMessageStatus(notification, queryClient);
      break;

    case "stateInstanceChanged":
      handleStateInstanceChanged(notification, queryClient);
      break;
  }
};
