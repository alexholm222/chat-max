import s from "./SkeletonWrapper.module.scss";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

interface SkeletonWrapperProps {
  isLoading: boolean;
  skeleton: ReactNode;
  children: ReactNode;
}

export const SkeletonWrapper = ({
  isLoading,
  skeleton,
  children,
}: SkeletonWrapperProps) => {
  return (
    <div className={s.root}>
      <div className={s.content} data-loading={isLoading}>
        {children}
      </div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className={s.skeleton}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
          >
            {skeleton}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
