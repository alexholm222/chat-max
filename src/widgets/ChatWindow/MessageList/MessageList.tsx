import s from "./MessageList.module.scss";
import { useRef, useState, useLayoutEffect } from "react";
import SimpleBar from "simplebar-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Message } from "../../../entities/message";
import type { MessageType } from "../../../entities/message/model/types";

interface MessageListProps {
  messages: MessageType[];
  chatId: string;
}

export const MessageList = ({ messages, chatId }: MessageListProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [paddingStart, setPaddingStart] = useState(0);

  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 10,
    getItemKey: (index) => messages[index].idMessage,
    anchorTo: "end",
    followOnAppend: true,
    scrollEndThreshold: 8000,
    directDomUpdates: true,
    paddingStart,
  });

  useLayoutEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    const updatePadding = () => {
      const totalSizeWithoutPadding =
        rowVirtualizer.getTotalSize() - paddingStart;
      const emptySpace = Math.max(
        0,
        parent.clientHeight - totalSizeWithoutPadding
      );
      if (emptySpace !== paddingStart) {
        setPaddingStart(emptySpace);
      }
    };

    updatePadding();

    const observer = new ResizeObserver(updatePadding);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [messages.length, rowVirtualizer, paddingStart]);

  useLayoutEffect(() => {
    rowVirtualizer.scrollToEnd();
  }, [rowVirtualizer, chatId]);

  const virtualItems = rowVirtualizer.getVirtualItems();

  return (
    <SimpleBar
      className={s.root}
      scrollableNodeProps={{
        ref: parentRef,
      }}
      autoHide
    >
      <div ref={rowVirtualizer.containerRef} className={s.content}>
        {virtualItems.map((virtualItem) => (
          <div
            key={virtualItem.key}
            ref={rowVirtualizer.measureElement}
            data-index={virtualItem.index}
            style={{
              minHeight: "40px",
              position: "absolute",
              transform: `translateY(${virtualItem.start}px)`,
              width: "100%",
            }}
          >
            <Message message={messages[virtualItem.index]!} />
          </div>
        ))}
      </div>
    </SimpleBar>
  );
};
