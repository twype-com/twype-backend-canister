import { FC } from 'react'
import {
  Envelope,
  House,
  MagnifyingGlass,
  Plus,
  User,
  Users,
  VideoCamera,
} from '@phosphor-icons/react'
import cn from 'classnames'
import { MenuItem, MenuItemName } from '../types'
import styles from './MainMenu.module.scss'

type MainMenuProps = {
  className?: string
  isHorizontal?: boolean
  items: MenuItemName[]
}

export const MainMenu: FC<MainMenuProps> = ({ className, isHorizontal, items }) => {
  const list: MenuItem[] = [
    {
      name: MenuItemName.HOME,
      text: 'For You',
      slug: 'home',
      icon: <House weight="bold" />,
    },
    {
      name: MenuItemName.FOLLOWING,
      text: 'Following',
      slug: 'following',
      icon: <Users weight="bold" />,
    },
    {
      name: MenuItemName.EXPLORE,
      text: 'Explore',
      slug: 'explore',
      icon: <MagnifyingGlass weight="bold" />,
      isActive: true,
    },
    {
      name: MenuItemName.LIVE,
      text: 'Live',
      slug: 'live',
      icon: <VideoCamera weight="bold" />,
    },
    {
      name: MenuItemName.UPLOAD,
      text: 'Upload',
      slug: 'upload',
      icon: <Plus weight="bold" />,
      isAccent: true,
    },
    {
      name: MenuItemName.INBOX,
      text: 'Inbox',
      slug: 'inbox',
      icon: <Envelope weight="bold" />,
    },
    {
      name: MenuItemName.ME,
      text: 'Me',
      slug: 'me',
      icon: <User weight="bold" />,
    },
  ]

  const menu = items
    .map(menuItem => {
      return list.find(item => item.name === menuItem)
    })
    .filter(Boolean)

  return (
    <nav className={cn(styles.menu, className)}>
      <ul className={cn(styles.list, { [styles.horizontal]: isHorizontal })}>
        {menu.map(item => (
          <li className={styles.item} key={item?.slug}>
            <a
              className={cn(
                styles.link,
                { [styles.active]: item?.isActive },
                { [styles.upload]: item?.name === MenuItemName.UPLOAD },
              )}
              href={`#${item?.slug}`}
            >
              <span className={styles.icon}>{item?.icon}</span>
              {item?.name !== MenuItemName.UPLOAD && (
                <span className={styles.text}>{item?.text}</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
