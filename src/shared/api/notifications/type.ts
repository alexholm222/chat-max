export type MessageStatus = "sent" | "delivered" | "read";

export interface InstanceData {
  idInstance: number;
  wid: string;
  typeInstance: string;
}

export interface IncomingMessageSenderData {
  chatId: string;
  chatName: string;
  chatType: "user" | "group";
  sender: string;
  senderName: string;
  senderType: "user" | "group";
  senderContactName: string;
  senderPhoneNumber: number;
}

export interface IncomingTextMessageData {
  typeMessage: "textMessage";

  textMessageData: {
    textMessage: string;
    forwardingScore: number;
    isForwarded: boolean;
  };
}

export interface MessageStatusNotification {
  receiptId: number;

  body: {
    typeWebhook: "outgoingMessageStatus";
    chatId: string;
    instanceData: InstanceData;
    timestamp: number;
    idMessage: string;
    status: MessageStatus;
  };
}

export interface IncomingMessageNotification {
  receiptId: number;

  body: {
    typeWebhook: "incomingMessageReceived";
    instanceData: InstanceData;
    timestamp: number;
    idMessage: string;
    senderData: IncomingMessageSenderData;
    messageData: IncomingTextMessageData;
  };
}
