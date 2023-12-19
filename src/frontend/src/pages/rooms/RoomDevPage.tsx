import { FC } from 'react'
import { Article } from '@/components/Article/Article'
import { RoomInfo } from '@/features/rooms/RoomInfo/RoomInfo'

export const RoomDevPage: FC = () => {
  return (
    <Article title="Test token gated call room" backUrl="/rooms">
      <RoomInfo />
    </Article>
  )
}
