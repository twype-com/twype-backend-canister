import { FC, PropsWithChildren } from 'react'
import styles from './Feed.module.scss'

export const Feed: FC<PropsWithChildren> = ({ children }) => {
  return <section className={styles.feed}>{children}</section>
}
