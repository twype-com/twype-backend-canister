import { FC } from 'react'
import cn from 'classnames'
import { Avatar, Button } from '@radix-ui/themes'
import styles from './MeetingAuthor.module.scss'

type MeetingAuthorProps = {
  name: string
  photoUrl?: string
  followers?: number
  isSubscribed?: boolean
  onSubscribe?: () => void
}

export const MeetingAuthor: FC<MeetingAuthorProps> = ({
  name,
  photoUrl,
  followers = 0,
  isSubscribed,
  onSubscribe,
}) => {
  return (
    <div className={cn(styles.author)}>
      <Avatar size="2" src={photoUrl} fallback="AT" radius="full" />
      <div className={styles.user}>
        <div className={styles.name}>{name}</div>
        <div className={styles.info}>{followers} followers</div>
      </div>
      <div className={styles.action}>
        <Button color="red" radius="full" size="1" onClick={onSubscribe}>
          {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
        </Button>
      </div>
    </div>
  )
}
