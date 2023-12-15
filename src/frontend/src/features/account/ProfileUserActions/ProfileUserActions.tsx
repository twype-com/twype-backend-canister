import { FC } from 'react'
import cn from 'classnames'
import { Button, DropdownMenu } from '@radix-ui/themes'
import { ShareFat, DotsThreeOutlineVertical } from '@phosphor-icons/react'
import styles from './ProfileUserActions.module.scss'

type ProfileUserActionsProps = {
  className?: string
}

export const ProfileUserActions: FC<ProfileUserActionsProps> = ({ className }) => {
  return (
    <div className={cn(styles.actions, className)}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="ghost">
            <ShareFat size={24} color="black" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content variant="soft">
          <DropdownMenu.Item>Share to Facebook</DropdownMenu.Item>
          <DropdownMenu.Item>Share to Twitter</DropdownMenu.Item>
          <DropdownMenu.Item>Copy link</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="ghost">
            <DotsThreeOutlineVertical size={24} color="black" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content variant="soft">
          <DropdownMenu.Item>Send Message</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}
