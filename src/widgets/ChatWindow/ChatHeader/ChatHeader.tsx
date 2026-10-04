import s from "./ChatHeader.module.scss";
import { Contact } from "../../../entities/contact";

export const ChatHeader = ({chatId}) => {
  return <div className={s.root}>
    <Contact chatId={chatId} />
  </div>;
};
