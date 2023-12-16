import { FC } from 'react'
import cn from 'classnames'
import { MenuItemName } from '@/features/navigation/types'
import { useLayout } from '@/features/layout/useLayout'
import { MainMenu } from '@/features/navigation/MainMenu/MainMenu'
import { FollowingAccounts } from '../FollowingAccounts/FollowingAccounts'
import styles from './Sidebar.module.scss'

type SidebarProps = {
  className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const { breakpoint } = useLayout()

  return (
    <aside className={cn(styles.sidebar, styles[breakpoint], className)}>
      <MainMenu
        items={[MenuItemName.HOME, MenuItemName.FOLLOWING, MenuItemName.EXPLORE, MenuItemName.LIVE]}
      />

      <FollowingAccounts />
    </aside>
  )
}
