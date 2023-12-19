import { FC, useEffect } from 'react'
import { useRoomContext } from '@livekit/components-react'
import cn from 'classnames'
// import { useDisconnectButton, useRoomContext } from '@livekit/components-react'
import { MeetingAuthor } from '@/features/meeting/MeetingAuthor/MeetingAuthor'
import { MeetingControl } from '@/features/meeting/MeetingControl/MeetingControl'
import styles from './MeetingBar.module.scss'

type MeetingBarProps = {
  isVisible: boolean
  isMicOn?: boolean
  isCamOn?: boolean
  isSubscribed?: boolean
  followers?: number
  toggleMic: (muteState: boolean) => void
  toggleCam: (muteState: boolean) => void
  onSubscribe?: () => void
  onClose: () => void
}

export const MeetingBar: FC<MeetingBarProps> = ({
  isVisible,
  isMicOn,
  isCamOn,
  isSubscribed,
  followers,
  toggleMic,
  toggleCam,
  onSubscribe,
  onClose,
}) => {
  // const { buttonProps } = useDisconnectButton({ stopTracks: true })
  const room = useRoomContext()

  useEffect(() => {
    if (room.state !== 'connected') return
    room.localParticipant.setMicrophoneEnabled(!!isMicOn)
  }, [isMicOn, room])

  useEffect(() => {
    if (room.state !== 'connected') return
    room.localParticipant.setCameraEnabled(!!isCamOn)
  }, [isCamOn, room])

  // const handleDisconnect = useCallback(() => {
  //   buttonProps.onClick()
  //   onClose()
  // }, [buttonProps, onClose])

  return (
    <div className={cn(styles.bar, { [styles.visible]: isVisible })}>
      <div className={styles.author}>
        <MeetingAuthor
          name="ChuckNorris"
          photoUrl="/images/avatar.png"
          isSubscribed={isSubscribed}
          followers={followers}
          onSubscribe={onSubscribe}
        />
      </div>
      <div className={styles.controls}>
        {/* <MeetingControl icon="cameraRotate" onClick={() => {}} /> */}
        <MeetingControl
          text={`Turn ${isCamOn ? 'on' : 'off'} camera`}
          icon="videoCamera"
          onClick={() => toggleCam(!isCamOn)}
        />
        {isCamOn ? (
          <MeetingControl
            text="Turn off camera"
            icon="videoCamera"
            onClick={() => toggleCam(true)}
          />
        ) : (
          <MeetingControl
            text="Turn on camera"
            icon="videoCameraSlash"
            onClick={() => toggleCam(false)}
          />
        )}
        {isMicOn ? (
          <MeetingControl
            text="Turn off microphone"
            icon="microphone"
            onClick={() => toggleMic(true)}
          />
        ) : (
          <MeetingControl
            text="Turn on microphone"
            icon="microphoneSlash"
            onClick={() => toggleMic(false)}
          />
        )}
        <MeetingControl text="Leave the meeting" icon="phone" color="red" onClick={onClose} />
      </div>
    </div>
  )
}
