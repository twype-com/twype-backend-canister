/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useReducer } from 'react'
import { useEffectOnce, useKeyPress } from 'react-use'
import { MeetingLayout } from '@/features/meeting/MeetingLayout/MeetingLayout'

// import { MessageItem } from '@/features/chat/types'
// import { Person } from '@/components/User/User'
// import chat from '@/mocks/chat.json'
// import participantsOnline from '@/mocks/participants.json'

// const chatList = chat as MessageItem[]
// const participantsList = participantsOnline as Person[]

// const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

export const MeetingGenerator: FC = () => {
  // const [messagesList, setMessagesList] = useState<MessageItem[]>([])

  const [increment, dispatch] = useReducer((num: number) => num + 1, 0)

  // @TODO: Remove this demo of participants
  // const [participantsNum, setParticipantsNum] = useState<number>(1)
  // const selectGrid = useCallback((event: KeyboardEvent) => {
  //   if (KEYS.includes(event.key)) {
  //     setParticipantsNum(Number(event.key))
  //   }
  // }, [])
  // @ts-ignore
  useKeyPress(selectGrid)
  // const participants = useMemo((): Person[] => {
  //   const result = [...participantsList]
  //   result.length = participantsNum
  //   return result
  // }, [participantsNum])
  // end todo

  const timer = () => {
    if (increment > 120) return
    dispatch()
    setTimeout(
      () => {
        timer()
      },
      Math.floor(Math.random() * 10) * 1000,
    )
  }

  useEffectOnce(() => {
    timer()
  })

  // useEffect(() => {
  //   if (increment < 1) return
  //   const nextMessage = chatList[messagesList.length]
  //   if (!nextMessage || messagesList.some((msg) => msg.id === nextMessage.id)) {
  //     return
  //   }
  //   setMessagesList((prev) => [...prev, nextMessage])
  // }, [increment])

  return <MeetingLayout />
}
