import { FC } from 'react'
import { AspectRatio } from '@radix-ui/themes'
import styles from './PostMedia.module.scss'

type PostMediaProps = {
  cover?: string
  isOnline?: boolean
}

export const PostMedia: FC<PostMediaProps> = ({ cover = '/images/jeex.png', isOnline }) => {
  return (
    <AspectRatio ratio={8 / 4} className={styles.media}>
      <picture>
        <img src={cover} alt="" className={styles.cover} />
      </picture>
      {isOnline && <div className={styles.online} />}
    </AspectRatio>
  )
}
