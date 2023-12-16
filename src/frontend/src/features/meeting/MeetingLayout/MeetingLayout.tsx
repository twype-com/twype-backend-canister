import { FC, useCallback, useState } from 'react'
import useUserStore from '@/features/user/store'
import { MeetingBar } from '@/features/meeting/MeetingBar/MeetingBar'
import { MeetingChat } from '@/features/meeting/MeetingChat/MeetingChat'
import { MeetingParticipants } from '@/features/meeting/MeetingParticipants/MeetingParticipants'
import { MeetingActions } from '@/features/meeting/MeetingActions/MeetingActions'
import { MeetingLiveKit } from '@/features/meeting/MeetingLiveKit/MeetingLiveKit'
import styles from './MeetingLayout.module.scss'

import participants from '@/mocks/participants.json'

export const MeetingLayout: FC = () => {
  // const router = useRouter()
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCamOn, setIsCamOn] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleMic = useCallback((micState: boolean) => {
    setIsMicOn(!micState)
  }, [])

  const handleCam = useCallback((camState: boolean) => {
    setIsCamOn(!camState)
  }, [])

  const handleClose = useCallback(() => {
    // router.push('.')
  }, [])

  const handleSubscribe = useCallback(() => {
    setIsSubscribed(!isSubscribed)
  }, [isSubscribed])

  const token = useUserStore((state) => state.livekitToken)

  if (!token) return null

  return (
    <div className={styles.meeting}>
      <MeetingLiveKit token={token}>
        <MeetingBar
          isVisible={true}
          isMicOn={isMicOn}
          isCamOn={isCamOn}
          isSubscribed={isSubscribed}
          followers={43}
          toggleMic={handleMic}
          toggleCam={handleCam}
          onSubscribe={handleSubscribe}
          onClose={handleClose}
        />

        {participants.length > 1 && <MeetingParticipants participants={participants} />}
      </MeetingLiveKit>

      <div className={styles.content}>
        <MeetingChat
          messages={[]}
          isOpen={isChatOpen}
          hasParticipants={participants.length > 1}
          onClose={() => setIsChatOpen(false)}
        />
        <MeetingActions
          commentsCounter={43}
          likes={75}
          isChatOpen={isChatOpen}
          onToggleChat={() => setIsChatOpen(!isChatOpen)}
        />
      </div>
    </div>
  )
}
