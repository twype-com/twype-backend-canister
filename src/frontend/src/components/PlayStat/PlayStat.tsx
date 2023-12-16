import { FC } from "react";
import cn from "classnames";
import { Play } from "@phosphor-icons/react";
import styles from "./PlayStat.module.scss";

type PlayStatProps = {
  className?: string;
  count: number;
};

export const PlayStat: FC<PlayStatProps> = ({ className, count }) => {
  return (
    <span className={cn(styles.play, className)}>
      <Play /> {count}
    </span>
  );
};
