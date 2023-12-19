import { FC, useCallback, useRef } from 'react'
import cn from 'classnames'
import {
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
  Track,
  VideoQuality,
} from 'livekit-client'

type RoomConnectorProps = {
  className?: string
  room: Room
}

export const RoomConnector: FC<RoomConnectorProps> = ({ className, room }) => {
  const videoTrack = useRef<HTMLHeadingElement>(null)

  const handleTrackSubscribed = useCallback(
    (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
      console.log('🚀 ~ participant:', participant)
      console.log('🚀 ~ publication:', publication)
      console.log('🚀 ~ track:', track)
      if (track.kind === Track.Kind.Video) {
        publication.setVideoQuality(VideoQuality.LOW)
        const element = track.attach()
        videoTrack?.current?.appendChild(element)
      }
    },
    [],
  )

  const cnt = useCallback(() => {
    room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed)
    const dev = room.getActiveDevice('videoinput')
    console.log('🚀 ~ cnt ~ dev:', dev)
  }, [handleTrackSubscribed, room])

  const setCamera = useCallback(() => {
    room.localParticipant.setCameraEnabled(true)
  }, [room])

  return (
    <div className={cn(className)}>
      <p>{room.name}</p>
      <button onClick={() => cnt()}>Connect</button>
      <div ref={videoTrack} />
      <button onClick={() => setCamera()}>setCamera</button>
    </div>
  )
}
