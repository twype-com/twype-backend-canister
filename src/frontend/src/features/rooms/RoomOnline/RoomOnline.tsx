/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import {
  RoomEvent,
  Room,
  RemoteTrack,
  RemoteTrackPublication,
  RemoteParticipant,
  Track,
  TrackEvent,
  VideoQuality,
  LocalVideoTrack,
} from 'livekit-client'
import {
  useRoomContext,
  useConnectionState,
  useTracks,
  VideoTrack,
} from '@livekit/components-react'
import { TrackReferenceOrPlaceholder } from '@livekit/components-core'

type RoomOnlineProps = {
  className?: string
}

export const RoomOnline: FC<RoomOnlineProps> = ({ className }) => {
  const roomContext = useRoomContext()
  console.log('🚀 ~ roomContext:', roomContext)
  const connectionState = useConnectionState()
  console.log('🚀 ~ connectionState:', connectionState)

  const cameraTrackRefs = useTracks([{ source: Track.Source.Camera, withPlaceholder: true }])
  console.log('🚀 ~ cameraTrackRefs:', cameraTrackRefs)

  const containerRef = useRef<HTMLDivElement>(null)

  const [localVideoTrack, setLocalVideoTrack] = useState<LocalVideoTrack | null>(null)

  return (
    <div ref={containerRef} className={cn(className)}>
      <p>!!{roomContext.name}</p>
    </div>
  )
}
