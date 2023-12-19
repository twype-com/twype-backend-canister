import { FC } from 'react'
import cn from 'classnames'
import styles from './SupBadge.module.scss'

type SupBadgeProps = {
  className?: string
  text: string
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info'
}

export const SupBadge: FC<SupBadgeProps> = ({ className, text, color = 'danger' }) => {
  return <sup className={cn(styles.badge, styles[color], className)}>{text}</sup>
}
