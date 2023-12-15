import { FC } from 'react'
import cn from 'classnames'
import { Avatar } from '@/components/Avatar/Avatar'
import { ProfileUserMain } from '../ProfileUserMain/ProfileUserMain'
import { ProfileUserActions } from '../ProfileUserActions/ProfileUserActions'
import { UserProfile } from '../types'
import styles from './ProfileUser.module.scss'

type ProfileUserProps = {
  className?: string
  profile: UserProfile
}

export const ProfileUser: FC<ProfileUserProps> = ({ className, profile }) => {
  return (
    <section className={cn(styles.profile, className)}>
      <Avatar
        address={'demo-address'}
        photoUrl={profile.photoUrl}
        userName={profile.nickName}
        className={styles.avatar}
      />
      <ProfileUserMain profile={profile} />
      <ProfileUserActions />
    </section>
  )
}
