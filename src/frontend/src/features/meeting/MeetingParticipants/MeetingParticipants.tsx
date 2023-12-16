import { FC } from 'react'
import cn from 'classnames'
import { Track } from 'livekit-client'
import { GridLayout, ParticipantTile, useTracks } from '@livekit/components-react'
import { Person } from '@/components/User/User'
import styles from './MeetingParticipants.module.scss'

export type Participant = Person & {
  isMuted?: boolean
}

type MeetingParticipantsProps = {
  participants: Participant[]
}

export const MeetingParticipants: FC<MeetingParticipantsProps> = () => {
  return (
    <div className={cn(styles.participants)}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.video}>
            <MyVideoConference />
          </div>
        </li>
      </ul>
    </div>
  )
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  )
  return (
    <GridLayout tracks={tracks}>
      <ParticipantTile />
    </GridLayout>
  )
}
