import s from "./ChatLastMessageSkeleton.module.scss";
import { Skeleton } from "../../../../shared/ui";

export const ChatLastMessageSceleton = () => {
  return (
    <div className={s.root}>
      <Skeleton width="97%" height={14} />
      <Skeleton width="60%" height={14} />
    </div>
  );
};
