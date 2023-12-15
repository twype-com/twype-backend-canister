import { FC } from 'react'
import cn from 'classnames'
import NiceAvatar, { genConfig } from 'react-nice-avatar'
import { Avatar as RadixAvatar } from '@radix-ui/themes'
import styles from './Avatar.module.scss'

type AvatarProps = {
  address: string
  photoUrl?: string
  userName?: string
  className?: string
}

export const Avatar: FC<AvatarProps> = ({ className, photoUrl, userName, address }) => {
  const config = genConfig(address)

  if (photoUrl) {
    return (
      <RadixAvatar
        src={photoUrl}
        fallback={userName || ''}
        radius="full"
        className={cn(styles.avatar, className)}
      />
    )
  }

  return <NiceAvatar className={cn(styles.avatar, className)} {...config} />
}
