import s from "./ChatPage.module.scss";
import { Outlet } from "react-router-dom";
import { ChatList } from "../../widgets";
import { AddChatButton } from "../../features/add-chat";
import { Logout } from "../../features/logout";
import { Group, Panel, Separator } from "react-resizable-panels";

export const ChatPage = () => {
  return (
    <div className={s.layout}>
      <Group orientation="horizontal" autoSave="chat-layout">
        <Panel className={s.left} defaultSize="367px" minSize="300px" maxSize="450px">
          <div className={s.listHeader}>
            <h2>Чаты</h2>
            <div className={s.buttons}>
              <Logout />
              <AddChatButton />
            </div>
          </div>
          <ChatList />
        </Panel>

        <Separator className={s.resizeHandle} />

        <Panel minSize="40%">
          <Outlet />
        </Panel>
      </Group>
    </div>
  );
};
