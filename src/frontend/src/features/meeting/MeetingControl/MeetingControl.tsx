import { FC } from 'react'
import {
  CameraRotate,
  ChartBar,
  ChatText,
  Heart,
  Microphone,
  MicrophoneSlash,
  PaperPlaneTilt,
  Phone,
  ShareFat,
  VideoCamera,
  VideoCameraSlash,
} from '@phosphor-icons/react'
import cn from 'classnames'
import styles from './MeetingControl.module.scss'

type MeetingIcon =
  | 'cameraRotate'
  | 'chartBar'
  | 'chatText'
  | 'heart'
  | 'heartFill'
  | 'plane'
  | 'microphone'
  | 'microphoneSlash'
  | 'shareFat'
  | 'phone'
  | 'videoCamera'
  | 'videoCameraSlash'

type MeetingControlProps = {
  className?: string
  icon: MeetingIcon
  color?: 'white' | 'red'
  isActive?: boolean
  text: string
  label?: string
  type?: 'normal' | 'compact'
  onClick: () => void
}

export const MeetingControl: FC<MeetingControlProps> = ({
  className,
  icon,
  color = 'white',
  isActive,
  text,
  label,
  type = 'normal',
  onClick,
}) => {
  const icons = {
    cameraRotate: <CameraRotate weight="fill" />,
    chartBar: <ChartBar weight="fill" />,
    chatText: <ChatText weight="fill" />,
    heart: <Heart weight="regular" />,
    heartFill: <Heart weight="fill" />,
    plane: <PaperPlaneTilt weight="regular" />,
    microphone: <Microphone weight="fill" />,
    microphoneSlash: <MicrophoneSlash weight="fill" />,
    phone: <Phone weight="fill" />,
    shareFat: <ShareFat weight="fill" />,
    videoCamera: <VideoCamera weight="fill" />,
    videoCameraSlash: <VideoCameraSlash weight="fill" />,
  }

  return (
    <div
      className={cn(
        styles.container,
        {
          [styles.compact]: type === 'compact',
        },
        className,
      )}
    >
      <button
        title={text}
        className={cn(styles.control, styles[color], {
          [styles.active]: isActive,
        })}
        onClick={onClick}
      >
        {icons[icon]}
      </button>
      <span className={styles.label}>{label}</span>
    </div>
  )
}
