import { FC, PropsWithChildren } from 'react'
import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react'
import { MeetingCompanion } from '../MeetingCompanion/MeetingCompanion'
import styles from './MeetingLiveKit.module.scss'

type MeetingLiveKitProps = {
  token: string
}

export const MeetingLiveKit: FC<PropsWithChildren<MeetingLiveKitProps>> = ({ children, token }) => {
  return (
    <LiveKitRoom
      className={styles.kit}
      video={true}
      audio={true}
      token={token}
      connectOptions={{ autoSubscribe: false }}
      serverUrl={'wss://meet-cbgsn7fz.livekit.cloud'}
      data-lk-theme="default"
    >
      <div className={styles.mainVideo}>
        <MeetingCompanion />
      </div>
      <RoomAudioRenderer />
      {children}
    </LiveKitRoom>
  )
}
