import { FC, PropsWithChildren } from 'react'
import { Header } from '@/features/headline/Header/Header'
import { Sidebar } from '@/features/sidebar/Sidebar/Sidebar'
import { Footer } from '@/features/footer/Footer/Footer'
import styles from './MainLayout.module.scss'

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header className={styles.header} />
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
      <Sidebar className={styles.sidebar} />
      <Footer className={styles.footer} />
    </div>
  )
}
