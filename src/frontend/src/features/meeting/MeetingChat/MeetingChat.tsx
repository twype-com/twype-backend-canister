import { FC, useCallback, useEffect, useState } from 'react'
import { X } from '@phosphor-icons/react'
import { Avatar, IconButton } from '@radix-ui/themes'
import cn from 'classnames'
import { MessageItem } from '@/features/chat/types'
import styles from './MeetingChat.module.scss'

type MeetingChatProps = {
  messages: MessageItem[]
  hasParticipants?: boolean
  isOpen?: boolean
  onClose: () => void
}

export const MeetingChat: FC<MeetingChatProps> = ({
  messages,
  hasParticipants,
  isOpen,
  onClose,
}) => {
  const [chatMessages, setChatMessages] = useState<MessageItem[]>([])
  const [newMessagesIds, setNewMessagesIds] = useState<number[]>([])

  const updateMessages = useCallback(() => {
    const oldIds = chatMessages.map(message => message.id)
    messages.forEach(message => {
      if (!oldIds.includes(message.id)) {
        setChatMessages(prev => [...prev, message])
        setNewMessagesIds(prev => [...prev, message.id])
      }
    })
    setTimeout(() => {
      setNewMessagesIds([])
    }, 300)
  }, [chatMessages, messages])

  useEffect(() => {
    updateMessages()
  }, [messages, updateMessages])

  return (
    <div
      className={cn(
        styles.chat,
        { [styles.open]: isOpen },
        { [styles.hasParticipants]: hasParticipants },
      )}
    >
      <ul className={styles.list}>
        {chatMessages.map((message, index) => (
          <li
            key={index}
            className={cn(styles.item, {
              [styles.new]: newMessagesIds.includes(message.id),
            })}
          >
            <div className={styles.message}>
              <Avatar
                size="1"
                src={message.photoUrl}
                fallback="AT"
                radius="full"
                className={styles.avatar}
              />
              <div className={styles.content}>
                <div className={styles.nickname}>{message.nickname}</div>
                <div className={styles.text}>{message.text}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {isOpen && (
        <IconButton
          className={styles.close}
          size="3"
          variant="soft"
          radius="full"
          onClick={() => onClose()}
        >
          <X width="24" height="24" />
        </IconButton>
      )}
    </div>
  )
}
