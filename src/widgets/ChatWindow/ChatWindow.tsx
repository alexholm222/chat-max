import s from "./ChatWindow.module.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChatHeader } from "./ChatHeader/ChatHeader";
import { MessageList } from "./MessageList/MessageList";
import { MessageComposer } from "../../features/send-message/ui";
import { useChatMessages } from "../../entities/message";
import { useReadChat } from "../../entities/chat";

export const ChatWindow = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { data, isLoading } = useChatMessages(chatId);
  const { markAsRead } = useReadChat(chatId, data);

  useEffect(() => {
    if (!isLoading) {
      markAsRead();
    }
  }, [isLoading, markAsRead]);

  return (
    <div className={s.window}>
      <ChatHeader chatId={chatId} />
      <MessageList messages={data ?? []} chatId={chatId} />
      <MessageComposer chatId={chatId} />
    </div>
  );
};
