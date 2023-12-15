import { FC } from 'react'
// import { Righteous } from 'next/font/google'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import styles from './Logo.module.scss'

// const righteous = Righteous({ weight: '400', subsets: ['latin'] })
// TODO: Add font

type LogoProps = {
  className?: string
}

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    // <Link to="/" className={cn(styles.brand, righteous.className, className)}>
    <Link to="/" className={cn(styles.brand, className)}>
      <div className={styles.logo}>Twype</div>
    </Link>
  )
}
