import { FC } from 'react'
import cn from 'classnames'
import { Avatar } from '@/components/Avatar/Avatar'
import styles from './User.module.scss'

export type Person = {
  nickName: string
  fullName?: string
  photoUrl?: string
  to?: string
  isOnline?: boolean
  isVerified?: boolean
  size?: 'small' | 'medium' | 'large'
}

type UserProps = Person & {
  className?: string
}

export const User: FC<UserProps> = ({ className, nickName, fullName }) => {
  return (
    <div className={cn(styles.user, className)}>
      <div className={styles.avatar}>
        <Avatar address={nickName} className={styles.avatar} />
      </div>
      <div className={styles.info}>
        <div className={styles.nickName}>{nickName}</div>
        {fullName && <div className={styles.fullName}>{fullName}</div>}
      </div>
    </div>
  )
}
