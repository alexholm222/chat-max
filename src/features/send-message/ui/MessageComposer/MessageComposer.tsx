import s from "./MessageComposer.module.scss";
import classnames from "classnames";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSendMessage } from "../../model/useSendMessage";
import { IconButton } from "../../../../shared/ui";
import TextareaAutosize from "react-textarea-autosize";
import { handleEnter } from "../../../../shared/utils";
import iconSend from "./assets/iconSend.svg";

interface MessageComposerType {
  chatId: string;
}

export const MessageComposer = ({ chatId }: MessageComposerType) => {
  const [value, setValue] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const { mutate: sendMessage, isPending } = useSendMessage(chatId!);

  const handleSend = () => {
    const message = value.trim();
    if (!message || isPending) {
      return;
    }
    setValue("");
    sendMessage(message, {
      onSuccess: () => {},
    });
  };

  return (
    <div className={s.root}>
      <div className={s.inputWrapper}>
        <TextareaAutosize
          value={value}
          minRows={1}
          maxRows={10}
          placeholder="Сообщение"
          className={classnames(s.input, isScroll && s.input_scroll)}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(e) => handleEnter(e, handleSend)}
          onHeightChange={(height) => {
            if (height >= 220) {
              setIsScroll(true);
              return;
            }
            setIsScroll(false);
          }}
        />
      </div>
      <AnimatePresence>
        {value.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: 8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.7, x: 8 }}
            transition={{
              duration: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <IconButton
              onClick={handleSend}
              size="xsmall"
              aria-label="Отправить сообщение"
              style={{ flexShrink: 0 }}
            >
              <img src={iconSend} alt="" />
            </IconButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
