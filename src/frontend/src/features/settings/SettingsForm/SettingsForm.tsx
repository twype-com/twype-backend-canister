import { FC } from 'react'
import { CaretDown } from '@phosphor-icons/react/dist/ssr/CaretDown'
import * as Form from '@radix-ui/react-form'
import { Button, IconButton, Switch } from '@radix-ui/themes'
import cn from 'classnames'
import styles from './SettingsForm.module.scss'

type SettingsFormProps = {
  className?: string
}

export const SettingsForm: FC<SettingsFormProps> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <Form.Root>
        <div className={styles.row}>
          <h2 className={styles.sectionName}>Manage account</h2>
          <Form.Field name="roomName" className={styles.field}>
            <div className={styles.section}>
              <div className={styles.side}>
                <Form.Label className={styles.label}>Notifications</Form.Label>
              </div>
              <div className={styles.info}>Delete account</div>
            </div>
            <div className={styles.main}>
              <Form.Control asChild className="control">
                <Button color="red" variant="outline" className={styles.delete}>
                  Delete
                </Button>
              </Form.Control>
            </div>
          </Form.Field>
        </div>

        <div className={styles.row}>
          <h2 className={styles.sectionName}>Privacy</h2>
          <Form.Field name="roomCode" className={styles.field}>
            <div className={styles.section}>
              <div className={styles.side}>
                <Form.Label className={styles.label}>Discoverability</Form.Label>
              </div>
              <div className={styles.info}>Private account</div>
            </div>
            <div className={styles.main}>
              <Form.Control asChild className="control">
                <Switch className="switch" />
              </Form.Control>
              <Form.Message match="valueMissing">Please enter Room code</Form.Message>
            </div>
          </Form.Field>
        </div>
        <div className={styles.row}>
          <Form.Field name="roomTimeout" className={styles.field}>
            <div className={styles.section}>
              <div className={styles.side}>
                <Form.Label className={styles.label}>Data</Form.Label>
              </div>
              <div className={styles.info}>Download your data</div>
            </div>
            <div className={styles.main}>
              <Form.Control asChild className="control">
                <IconButton variant="ghost" disabled>
                  {'>'}
                </IconButton>
              </Form.Control>
              <Form.Message match="valueMissing">Please enter Room code</Form.Message>
            </div>
          </Form.Field>
        </div>

        <div className={styles.row}>
          <h2 className={styles.sectionName}>Push notifications</h2>
          <Form.Field name="roomCode" className={styles.field}>
            <div className={styles.section}>
              <div className={styles.side}>
                <Form.Label className={styles.label}>Desktop notifications</Form.Label>
              </div>
              <div className={styles.info}>Allow in browser</div>
            </div>
            <div className={styles.main}>
              <Form.Control asChild className="control">
                <Switch className="switch" />
              </Form.Control>
            </div>
          </Form.Field>
        </div>
        <div className={styles.row}>
          <Form.Field name="roomTimeout" className={styles.field}>
            <div className={styles.section}>
              <div className={styles.side}>
                <Form.Label className={styles.label}>Your preferences</Form.Label>
              </div>
              <div className={styles.info}>Interactions</div>
            </div>
            <div className={styles.main}>
              <Form.Control asChild className="control">
                <IconButton variant="ghost" disabled>
                  <CaretDown size={16} />
                </IconButton>
              </Form.Control>
              <Form.Message match="valueMissing">Please enter Room code</Form.Message>
            </div>
          </Form.Field>
        </div>

        <div className={styles.row}>
          <Form.Submit asChild>
            <Button size={'3'}>Save</Button>
          </Form.Submit>
        </div>
      </Form.Root>
    </div>
  )
}
