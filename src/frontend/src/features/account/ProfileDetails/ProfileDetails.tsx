import { FC } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import { Badge } from '@radix-ui/themes'
import { Link as LinksIcon } from '@phosphor-icons/react'
import { UserProfile } from '@/features/account/types'
import styles from './ProfileDetails.module.scss'

type ProfileDetailsProps = {
  className?: string
  profile: UserProfile
}

export const ProfileDetails: FC<ProfileDetailsProps> = ({ className, profile }) => {
  return (
    <section className={cn(styles.details, className)}>
      <div className={styles.profileValues}>
        <span>
          <b className={styles.value}>{profile.subscriptions}</b> Following
        </span>
        <span>
          <b className={styles.value}>{profile.subscribers}</b> Followers
        </span>
        <span>
          <Badge color={profile.isOnline ? 'green' : 'gray'} size="1" variant="surface">
            {profile.isOnline ? 'Online' : 'Offline'}
          </Badge>
        </span>
      </div>
      <div>
        <p className={styles.description}>
          {profile.description?.length ? profile.description : 'No description'}
        </p>
      </div>
      {'links' in profile && (
        <div className={styles.links}>
          <LinksIcon size={24} color="black" />
          {profile.links?.map((oneLink, id) => {
            return (
              <Link key={id} to={oneLink.link} className={styles.link}>
                {oneLink.title}
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}
