export interface BaseMessage {
  type: "outgoing" | "incoming";
  idMessage: string;
  timestamp: number;
  chatId: string;
  chatType: "user" | "group" | "channel" | "bot";
  isForwarded: boolean;
  forwardingScore?: number;
  deletedMessageId?: string;
  editedMessageId?: string;
  isEdited: boolean;
  isDeleted: boolean;
  isNew?: boolean;
}

interface IncomingMessage extends BaseMessage {
  type: "incoming";
  senderName: string;
  senderType: "user" | "group" | "channel" | "bot";
  senderContactName: string;
}

interface OutgoingMessage extends BaseMessage {
  type: "outgoing";
  statusMessage: "sent" | "delivered" | "read" | "error";
  sendByApi: boolean;
}

interface TextMessageContent {
  typeMessage: "textMessage";
  textMessage: string;
}

interface ExtendedTextMessageContent {
  typeMessage: "extendedTextMessage";
  extendedTextMessage: ExtendedTextMessage;
}

interface ExtendedTextMessage {
  text?: string;
  description?: string;
  title?: string;
  jpegThumbnail?: string;
  isForwarded: boolean;
  forwardingScore?: number;
}

interface MediaMessageContent {
  typeMessage:
    | "imageMessage"
    | "videoMessage"
    | "documentMessage"
    | "audioMessage"
    | "stickerMessage";

  downloadUrl: string;
  downloadUrlJpeg?: string;
  caption?: string;
  fileName?: string;
  jpegThumbnail?: string;
  mimeType: string;
  isAnimated: boolean;
}

interface ReactionMessageContent {
  typeMessage: "reactionMessage";
  extendedTextMessageData: ExtendedTextMessageData;
  quotedMessage: QuotedMessageContent;
}

interface ExtendedTextMessageData {
  text?: string;
}

interface PollMessageContent {
  typeMessage: "pollMessage";
  pollMessageData: PollMessageData;
}

interface PollMessageData {
  name: string;
  options: string[];
  allowToChangeAnswer: boolean;
}

interface QuotedMessageContent {
  stanzaId: string;
  participant: string;
  typeMessage: MessageContent;
}

type MessageContent =
  | TextMessageContent
  | ExtendedTextMessageContent
  | MediaMessageContent
  | ReactionMessageContent
  | PollMessageContent;

export type MessageType =
  | (IncomingMessage & MessageContent)
  | (OutgoingMessage & MessageContent);
