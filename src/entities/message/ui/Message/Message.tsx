import s from "./Message.module.scss";
import classNames from "classnames";
import { MessageMeta } from "../MessageMeta/MessageMeta";

export const Message = ({ message }) => {
  const isOutgoing = message.type === "outgoing";
  const lastMessageContent = message?.textMessage ? message?.textMessage : "Вложения";
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
