/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { Room } from 'livekit-client'
import { Article } from '@/components/Article/Article'
import { RoomConnector } from '@/features/rooms/RoomConnector/RoomConnector'
import { Loader } from '@/components/Loader/Loader'

export const RoomLoader: FC = () => {
  // const { room: roomName } = useParams()
  const [token, setToken] = useState('')

  const [roomOnline, setRoomOnline] = useState<Room | null>(null)

  return (
    <Article title={'Room ${roomName}'} backUrl="/rooms">
      {token === '' ? (
        <Loader title="Getting token..." />
      ) : (
        <>
          <div>Room online: {roomOnline?.name}</div>
          <Link to={`./${roomOnline?.name}/call`}>Call</Link>{' '}
          <Link to={`./${roomOnline?.name}/edit`}>Edit</Link>
          {roomOnline && <RoomConnector room={roomOnline} />}
        </>
      )}
    </Article>
  )
}
