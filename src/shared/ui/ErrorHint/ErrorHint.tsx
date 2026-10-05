import s from "./ErrorHint.module.scss";
import { motion, AnimatePresence } from "motion/react";

interface ErrorHintProps {
  isError: boolean;
  text?: string;
}

export const ErrorHint = ({ isError, text }: ErrorHintProps) => {
  return (
    <AnimatePresence mode="wait">
      {text && (
        <motion.p
          key={text}
          className={isError ? s.error : undefined}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          {text}
        </motion.p>
      )}
    </AnimatePresence>
  );
};
