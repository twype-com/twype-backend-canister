import { FC, useCallback, useState } from 'react'
import * as Form from '@radix-ui/react-form'
import cn from 'classnames'
import { customAlphabet } from 'nanoid'
import { nolookalikes } from 'nanoid-dictionary'
import { useEffectOnce } from 'react-use'
import Input from '@/components/Input/Input'
// import { Button } from '@radix-ui/themes'
import { Spinner } from '@/components/Spinner/Spinner'
import { NewRoom } from '@/features/rooms/types'
import formStyles from '@/styles/form.module.scss'

type RoomFormProps = {
  className?: string
  onSubmit: (room: NewRoom) => void
}

export const RoomForm: FC<RoomFormProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [roomName, setRoomName] = useState<string>('')
  const [roomCode, setRoomCode] = useState<string>('')
  const [roomTimeout, setRoomTimeout] = useState<string>('')
  const [maxParticipants, setMaxParticipants] = useState<string>('')

  const generateRoomSlug = useCallback(() => {
    setIsLoading(true)
    const code = customAlphabet(nolookalikes.toLocaleLowerCase(), 4)
    // TODO: check if room with this code exists
    setTimeout(() => {
      setRoomCode(code())
      setIsLoading(false)
    }, 300)
  }, [])

  useEffectOnce(() => {
    generateRoomSlug()
  })

  // const canSubmit = useMemo(() => {
  //   return !!roomName && !!roomCode
  // }, [roomCode, roomName])

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   onSubmit({
  //     name: roomName,
  //     emptyTimeout: roomTimeout ? Number(roomTimeout) : undefined,
  //     maxParticipants: maxParticipants ? Number(maxParticipants) : undefined,
  //   })
  // }

  return (
    <div className={cn(className)}>
      <Form.Root>
        <div className={formStyles.row}>
          <Form.Field name="roomName" className={formStyles.field}>
            <div className={formStyles.side}>
              <Form.Label className={formStyles.label}>Room name *</Form.Label>
            </div>
            <div className={formStyles.main}>
              <Form.Control asChild>
                <Input
                  type="text"
                  value={roomName}
                  required
                  className={formStyles.input}
                  onChange={event => setRoomName(event.target.value)}
                />
              </Form.Control>
              <Form.Message
                match="valueMissing"
                className={cn(formStyles.message, formStyles.error)}
              >
                Please enter Room name
              </Form.Message>
              <div className={formStyles.info}>
                Usernames can only contain letters, numbers, underscores, and periods. Changing your
                username will also change your profile link.
              </div>
            </div>
          </Form.Field>
        </div>

        <div className={formStyles.row}>
          <Form.Field name="roomCode" className={formStyles.field}>
            <div className={formStyles.side}>
              <Form.Label className={formStyles.label}>Room code *</Form.Label>
            </div>
            <div className={formStyles.main}>
              <Form.Control asChild>
                <Input
                  type="text"
                  value={roomCode}
                  required
                  readOnly
                  width={180}
                  className={formStyles.input}
                  onChange={event => setRoomCode(event.target.value)}
                />
              </Form.Control>
              <Form.Message match="valueMissing">Please enter Room code</Form.Message>
            </div>
          </Form.Field>
        </div>

        <div className={formStyles.row}>
          <Form.Field name="roomTimeout" className={formStyles.field}>
            <div className={formStyles.side}>
              <Form.Label className={formStyles.label}>Room timeout</Form.Label>
            </div>
            <div className={formStyles.main}>
              <Form.Control asChild>
                <Input
                  type="number"
                  value={roomTimeout}
                  width={100}
                  className={formStyles.input}
                  onChange={event => setRoomTimeout(event.target.value)}
                />
              </Form.Control>
              <div className={formStyles.info}>Please, the the timeout in seconds</div>
            </div>
          </Form.Field>
        </div>

        <div className={formStyles.row}>
          <Form.Field name="roomTimeout" className={formStyles.field}>
            <div className={formStyles.side}>
              <Form.Label className={formStyles.label}>Max participants</Form.Label>
            </div>
            <div className={formStyles.main}>
              <Form.Control asChild>
                <Input
                  type="number"
                  value={maxParticipants}
                  width={100}
                  className={formStyles.input}
                  onChange={event => setMaxParticipants(event.target.value)}
                />
              </Form.Control>
            </div>
          </Form.Field>
        </div>

        <div className={formStyles.row}>
          <Form.Submit asChild>
            {/* <Button disabled={isLoading || !canSubmit} onClick={(event) => handleSubmit(event)}>
              Create
            </Button> */}
          </Form.Submit>
          <div className={formStyles.field}>{isLoading && <Spinner size="small" />}</div>
        </div>
      </Form.Root>
    </div>
  )
}
