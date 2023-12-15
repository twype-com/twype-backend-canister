import { FC } from "react";
import cn from "classnames";
import styles from "./Spinner.module.scss";

type SpinnerProps = {
  size?: "default" | "small";
  className?: string;
};

export const Spinner: FC<SpinnerProps> = ({ size = "default", className }) => {
  return <span className={cn(styles.spinner, styles[size], className)} />;
};
