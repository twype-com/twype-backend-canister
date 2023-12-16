import { FC, useCallback, useState } from 'react'
import cn from 'classnames'
import { MeetingControl } from '@/features/meeting/MeetingControl/MeetingControl'
import styles from './MeetingActions.module.scss'

type MeetingActionsProps = {
  commentsCounter?: number
  likes?: number
  isChatOpen?: boolean
  onToggleChat: () => void
}

export const MeetingActions: FC<MeetingActionsProps> = ({
  commentsCounter = 0,
  likes = 0,
  isChatOpen,
  onToggleChat,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isLike, setIsLike] = useState(false)

  const handleSubmit = useCallback(() => {
    console.log('handleSubmit')
  }, [])

  return (
    <div
      className={cn(
        styles.actions,
        { [styles.focused]: isFocused || isChatOpen },
        { [styles.inFrame]: isChatOpen },
      )}
    >
      <div className={styles.comments}>
        <MeetingControl
          className={styles.allComments}
          text="Comments"
          label={`${commentsCounter}`}
          icon="chatText"
          type="compact"
          onClick={() => onToggleChat()}
        />
        <div className={styles.newComment}>
          <textarea
            className={styles.field}
            placeholder="Add new comment..."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <MeetingControl
            className={styles.send}
            text="Send"
            label="Send"
            icon="plane"
            type="compact"
            onClick={handleSubmit}
          />
        </div>
      </div>

      <div className={styles.controls}>
        <MeetingControl
          text="Poll"
          label="Poll"
          icon="chartBar"
          type="compact"
          onClick={() => {}}
        />
        <MeetingControl text="Share" label="26" icon="shareFat" type="compact" onClick={() => {}} />
        <MeetingControl
          text="Like"
          label={likes?.toString()}
          icon={isLike ? 'heartFill' : 'heart'}
          type="compact"
          className={cn({ [styles.liked]: isLike })}
          onClick={() => setIsLike(!isLike)}
        />
      </div>
    </div>
  )
}
