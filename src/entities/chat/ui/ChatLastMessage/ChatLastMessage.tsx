import s from "./ChatLastMessage.module.scss";

import { useChatLastMessage } from "../../model/useChatLastMessage";
import { SkeletonWrapper } from "../../../../shared/ui";
import { ChatLastMessageSceleton } from "./ChatLastMessageSceleton";

export const ChatLastMessage = ({ chatId }) => {
  const { data, isLoading } = useChatLastMessage(chatId);
  const lastMessage = data ? data : null;
  const lastMessageContent = data?.textMessage ? data?.textMessage : "Вложение";

  return (
    <SkeletonWrapper
      isLoading={isLoading}
      skeleton={<ChatLastMessageSceleton width={"90%"} height={12} />}
    >
      <div className={s.message}>
        {!lastMessage && "Не удалось загрузить последнее сообщение"}
        {lastMessage && lastMessageContent}
      </div>
    </SkeletonWrapper>
  );
};
