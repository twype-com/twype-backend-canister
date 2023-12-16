import { FC } from "react";
import cn from "classnames";
import { Heart } from "@phosphor-icons/react";
import styles from "./Like.module.scss";

type LikeProps = {
  className?: string;
  count: number;
};

export const Like: FC<LikeProps> = ({ className, count }) => {
  return (
    <span className={cn(styles.like, className)}>
      <Heart /> {count}
    </span>
  );
};
