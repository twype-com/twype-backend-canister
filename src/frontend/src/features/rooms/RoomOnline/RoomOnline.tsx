import { FC, useRef } from 'react'
import { useConnectionState, useRoomContext, useTracks } from '@livekit/components-react'
import cn from 'classnames'
import { Track } from 'livekit-client'

// import { TrackReferenceOrPlaceholder } from '@livekit/components-core'

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

  // const [localVideoTrack, setLocalVideoTrack] = useState<LocalVideoTrack | null>(null)

  return (
    <div ref={containerRef} className={cn(className)}>
      <p>!!{roomContext.name}</p>
    </div>
  )
}
