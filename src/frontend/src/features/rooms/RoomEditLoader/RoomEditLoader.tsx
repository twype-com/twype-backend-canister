import { FC, useState } from 'react'
import { Article } from '@/components/Article/Article'
import { RoomForm } from '@/features/rooms/RoomForm/RoomForm'
import { NewRoom } from '@/features/rooms/types'

export const RoomEditLoader: FC = () => {
  const [roomData, setRoomDate] = useState<NewRoom | null>(null)
  console.log('🚀 ~ roomData:', roomData)

  return (
    <Article title="Edit room" backUrl="/rooms">
      <RoomForm onSubmit={room => setRoomDate(room)} />
    </Article>
  )
}
