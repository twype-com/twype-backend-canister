import { FC } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import styles from './Logo.module.scss'

type LogoProps = {
  className?: string
}

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link to="/" className={cn(styles.brand, className)}>
      <div className={styles.logo}>Twype</div>
    </Link>
  )
}
