import s from "./Message.module.scss";
import classNames from "classnames";
import { MessageMeta } from "../MessageMeta/MessageMeta";
import type { MessageType } from "../../model/types";

interface MessageProps {
  message: MessageType;
}

export const Message = ({ message }: MessageProps) => {
  const isOutgoing = message.type === "outgoing";
  const lastMessageContent =
    message.typeMessage === "textMessage"
      ? message.textMessage
      : message.typeMessage === "extendedTextMessage"
      ? message.extendedTextMessage.text
      : "Вложения";

  return (
    <div className={classNames(s.message, isOutgoing && s.outgoing)}>
      <div className={s.bubble}>
        <div className={s.content}>
          {lastMessageContent}
          <MessageMeta
            timestamp={message.timestamp}
            status={isOutgoing ? message.statusMessage : undefined}
          />
        </div>
      </div>
    </div>
  );
};
