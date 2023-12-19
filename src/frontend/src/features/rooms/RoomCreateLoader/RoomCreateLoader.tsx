import { FC, useState } from 'react'
import { Article } from '@/components/Article/Article'
import { CreateRoomSender } from '@/features/rooms/CreateRoomSender/CreateRoomSender'
import { RoomForm } from '@/features/rooms/RoomForm/RoomForm'
import { NewRoom } from '@/features/rooms/types'

export const RoomCreateLoader: FC = () => {
  const [newRoom, setNewRoom] = useState<NewRoom | null>(null)

  return (
    <Article title="Create new room" backUrl="/rooms" isProtected>
      {!newRoom ? (
        <RoomForm onSubmit={room => setNewRoom(room)} />
      ) : (
        <CreateRoomSender newRoom={newRoom} />
      )}
    </Article>
  )
}
