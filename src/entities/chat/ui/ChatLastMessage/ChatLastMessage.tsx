import s from "./ChatLastMessage.module.scss";

import { useChatLastMessage } from "../../model/useChatLastMessage";
import { SkeletonWrapper } from "../../../../shared/ui";
import { ChatLastMessageSceleton } from "./ChatLastMessageSceleton";

interface ChatLastMessageProps {
  chatId: string;
}

export const ChatLastMessage = ({ chatId }: ChatLastMessageProps) => {
  const { data, isLoading } = useChatLastMessage(chatId);
  const lastMessage = data ? data : null;
  const lastMessageContent = data?.textMessage ? data?.textMessage : "Вложение";

  return (
    <SkeletonWrapper
      isLoading={isLoading}
      skeleton={<ChatLastMessageSceleton/>}
    >
      <div className={s.message}>
        {!lastMessage && "Не удалось загрузить последнее сообщение"}
        {lastMessage && lastMessageContent}
      </div>
    </SkeletonWrapper>
  );
};
