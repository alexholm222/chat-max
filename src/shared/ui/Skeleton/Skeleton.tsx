import s from "./Skeleton.module.scss";

type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  borderRadius?:  number;
};

export const Skeleton = ({
  width = "100%",
  height = 16,
  borderRadius = 6,
}: SkeletonProps) => {
  return (
    <div
      className={s.root}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};