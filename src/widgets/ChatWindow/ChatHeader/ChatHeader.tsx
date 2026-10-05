import s from "./ChatHeader.module.scss";
import { Contact } from "../../../entities/contact";

interface ChatHeaderProps {
  chatId: string;
}

export const ChatHeader = ({ chatId }: ChatHeaderProps) => {
  return (
    <div className={s.root}>
      <Contact chatId={chatId} />
    </div>
  );
};
