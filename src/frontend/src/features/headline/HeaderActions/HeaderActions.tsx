import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip, IconButton, Button } from '@radix-ui/themes'
import { Envelope, MagnifyingGlass, PaperPlaneTilt, Plus } from '@phosphor-icons/react'
import { SupBadge } from '@/components/SupBadge/SupBadge'
import { HeaderUser } from '../HeaderUser/HeaderUser'
import styles from './HeaderActions.module.scss'

export const HeaderActions: FC = () => {
  return (
    <div className={styles.actions}>
      <Link to="/rooms/dev">
        <Button variant="outline" color="gray" className={styles.upload}>
          <span className={styles.uploadText}>DEV room</span>
        </Button>
      </Link>

      <Link to="/rooms/create">
        <Button variant="outline" color="gray" className={styles.upload}>
          <Plus weight="bold" /> <span className={styles.uploadText}>Create room</span>
        </Button>
      </Link>

      <div className={styles.search}>
        <Tooltip content="Messages">
          <IconButton size="3" radius="full" className={styles.button}>
            <MagnifyingGlass />
          </IconButton>
        </Tooltip>
      </div>

      <Tooltip content="Messages">
        <IconButton size="3" radius="full" className={styles.button}>
          <PaperPlaneTilt />
        </IconButton>
      </Tooltip>

      <Tooltip content="Inbox">
        <IconButton size="3" radius="full" className={styles.button}>
          <Envelope />
          <SupBadge text="3" className={styles.badge} />
        </IconButton>
      </Tooltip>

      <HeaderUser />
    </div>
  )
}
