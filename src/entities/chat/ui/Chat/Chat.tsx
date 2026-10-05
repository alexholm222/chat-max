import s from "./Chat.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { CellSimple, Counter } from "../../../../shared/ui";
import { ChatAvatar } from "../ChatAvatar/ChatAvatar";
import { ChatLastMessage } from "../ChatLastMessage/ChatLastMessage";
import classNames from "classnames";
import type { VirtualItem } from "@tanstack/react-virtual";
import type { Chat as ChatType } from "../../model/types";

interface ChatProps {
  chat: ChatType;
  virtualItem: VirtualItem;
}

export const Chat = ({ chat, virtualItem }: ChatProps) => {
  const { chatId: openChatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  return (
    <motion.div
      initial={false}
      layout
      transition={{
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <CellSimple
        surface={openChatId === chat.chatId ? "island" : "default"}
        key={chat.chatId}
        className={classNames(
          s.chat,
          openChatId === chat.chatId && s.chat_active
        )}
        style={{
          height: `${virtualItem.size}px`,
          transform: `translateY(${virtualItem.start}px)`,
        }}
        innerClassNames={{
          before: s.before,
        }}
        before={<ChatAvatar chatId={chat.chatId} size={56} />}
        after={
          (chat.unreadCount ?? 0) > 0 && (
            <Counter key="counter" value={chat.unreadCount ?? 0} />
          )
        }
        onClick={() => navigate(`${chat.chatId}`)}
        title={chat.name}
        subtitle={<ChatLastMessage chatId={chat.chatId} />}
      />
    </motion.div>
  );
};
