import { FC } from 'react'
import { AspectRatio } from '@radix-ui/themes'
import styles from './PostMedia.module.scss'
import image from '../../../assets/room.jpg'

type PostMediaProps = {
  cover?: string
  isOnline?: boolean
}

export const PostMedia: FC<PostMediaProps> = ({ isOnline }) => {
  return (
    <AspectRatio ratio={8 / 4} className={styles.media}>
      <img src={image} alt="" className={styles.cover} />
      {isOnline && <div className={styles.online} />}
    </AspectRatio>
  )
}
