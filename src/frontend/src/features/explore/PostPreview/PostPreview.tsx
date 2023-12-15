import { FC } from 'react'
import { UserCircle } from '@phosphor-icons/react'
import { PostMedia } from '@/features/explore/PostMedia/PostMedia'
import styles from './PostPreview.module.scss'

type PostPreviewProps = {
  title: string
  cover?: string
  isOnline?: boolean
  usersOnline?: number
  onClick?: () => void
}

export const PostPreview: FC<PostPreviewProps> = ({
  title,
  cover = '/images/twype.png',
  isOnline,
  usersOnline = 0,
  onClick,
}) => {
  return (
    <div onClick={onClick} className={styles.post}>
      <PostMedia cover={cover} isOnline={isOnline} />
      <footer className={styles.footer}>
        <div className={styles.info}>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <div className={styles.users}>
          <UserCircle weight="bold" /> {usersOnline}
        </div>
      </footer>
    </div>
  )
}
