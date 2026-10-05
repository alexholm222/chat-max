import s from "./ChatList.module.scss";
import { useRef } from "react";
import SimpleBar from "simplebar-react";
import { CellList } from "../../shared/ui";
import { Chat } from "../../entities/chat/ui/Chat/Chat";
import { useChatList } from "../../entities/chat/model/useChatList";
import { useVirtualizer } from "@tanstack/react-virtual";

export const ChatList = () => {
  const { data } = useChatList();
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: data?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 92,
    overscan: 10,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  return (
    <SimpleBar
      className={s.root}
      scrollableNodeProps={{
        ref: parentRef,
      }}
      autoHide
    >
      <CellList
        style={{
          height: rowVirtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {virtualItems?.map((virtualItem) => {
          const chat = data?.[virtualItem.index];

          return <Chat key={chat.chatId} chat={chat} virtualItem={virtualItem} />;
        })}
      </CellList>
    </SimpleBar>
  );
};
