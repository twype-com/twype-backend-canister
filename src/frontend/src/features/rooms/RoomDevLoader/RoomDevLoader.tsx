import { FC } from 'react'
import { Article } from '@/components/Article/Article'
import { RoomInfo } from '@/features/rooms/RoomInfo/RoomInfo'

export const RoomDevLoader: FC = () => {
  return (
    <Article title="Static development room" backUrl="/rooms" isProtected>
      <RoomInfo />
    </Article>
  )
}
