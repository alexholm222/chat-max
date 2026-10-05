import s from "./MessageMeta.module.scss";
import { motion } from "motion/react";
import dayjs from "dayjs";
import CheckIcon from "./assets/checkIcon.svg?react";
import IconTime from "./assets/iconTime.svg?react";

interface MessageMetaProps {
  timestamp: number;
  status?: string;
}

export const MessageMeta = ({ timestamp, status }: MessageMetaProps) => {
  const isSent = status === "sent";
  const isRead = status === "read";
  const isDelivered = status === "delivered";
  console.log(status);

  return (
    <span className={s.meta}>
      <p className={s.time}> {dayjs.unix(timestamp).format("HH:MM")}</p>
      {status && (
        <span className={s.status}>
          {isSent && <IconTime />}
          {(isDelivered || isRead) && <CheckIcon />}

          {isRead && (
            <motion.span
              className={s.secondCheck}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <CheckIcon />
            </motion.span>
          )}
        </span>
      )}
    </span>
  );
};
