import { FC } from 'react'
import { GridLayout, ParticipantTile, useTracks } from '@livekit/components-react'
import cn from 'classnames'
import { Track } from 'livekit-client'
import styles from './MeetingCompanion.module.scss'

export const MeetingCompanion: FC = () => {
  const CompanionVideoConference = () => {
    const tracks = useTracks(
      [
        { source: Track.Source.Camera, withPlaceholder: true },
        { source: Track.Source.ScreenShare, withPlaceholder: false },
      ],
      { onlySubscribed: false },
    )
    // if (!result) return null
    return (
      <GridLayout tracks={tracks}>
        <ParticipantTile />
      </GridLayout>
    )
  }

  return (
    <div className={cn(styles.companion)}>
      <CompanionVideoConference />
    </div>
  )
}
