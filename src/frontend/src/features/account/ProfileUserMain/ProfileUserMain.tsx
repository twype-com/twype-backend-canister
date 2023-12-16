import { FC } from 'react'
import cn from 'classnames'
import { Button } from '@radix-ui/themes'
import { ProfileBalance } from '../ProfileBalance/ProfileBalance'
import { UserProfile } from '../types'
import styles from './ProfileUserMain.module.scss'

type ProfileUserMainProps = {
  className?: string
  profile: UserProfile
}

export const ProfileUserMain: FC<ProfileUserMainProps> = ({ className, profile }) => {
  return (
    <div className={cn(styles.main, className)}>
      <div className={styles.nickName}>
        <h3 className={styles.nick}>{profile.nickName}</h3>
        <p className={styles.name}>{profile.fullName}</p>
      </div>
      <ProfileBalance />
      <div className={styles.buttons}>
        <Button size="3" className={styles.subscribe}>
          Follow
        </Button>
      </div>
    </div>
  )
}
