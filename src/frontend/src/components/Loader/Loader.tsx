import { FC } from "react";
import cn from "classnames";
import { Spinner } from "@/components/Spinner/Spinner";
import styles from "./Loader.module.scss";

type SpinnerProps = {
  title?: string;
  className?: string;
};

export const Loader: FC<SpinnerProps> = ({ title, className }) => {
  return (
    <div className={cn(styles.loader, className)}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.view}>
        <Spinner />
      </div>
    </div>
  );
};
