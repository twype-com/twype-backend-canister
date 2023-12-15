import { FC } from 'react'
import cn from 'classnames'
import { Logo } from '@/components/Logo/Logo'
import { HeaderActions } from '../HeaderActions/HeaderActions'
import styles from './Header.module.scss'

type HeaderProps = {
  className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(styles.header, className)}>
      <div className={styles.container}>
        <Logo className={styles.logo} />
        <div className={styles.search}>search</div>
        <div className={styles.actions}>
          <HeaderActions />
        </div>
      </div>
    </header>
  )
}
