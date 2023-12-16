import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@radix-ui/themes'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Avatar } from '@/components/Avatar/Avatar'
import { UserMenuItem } from '../types'
import styles from './HeaderUser.module.scss'
import { useInternetIdentity } from '@/hooks/useInternetIdentity'

export const HeaderUser: FC = () => {
  // const address = useUserStore((state) => state.walletAddress)
  // const login = useUserStore((state) => state.updateWalletAddress)
  // const logout = useUserStore((state) => state.logout)
  const { login, address, logout } = useInternetIdentity()

  const menu: UserMenuItem[] = [
    {
      text: 'View profile',
      href: `/users/${address}`,
      slug: 'my-profile',
    },
    // {
    //   text: 'Favorites',
    //   slug: 'favorites',
    // },
    // {
    //   text: 'Settings',
    //   slug: 'settings',
    // },
  ]

  if (!address) {
    return (
      <Button onClick={() => login?.()} variant="outline">
        Connect wallet
      </Button>
    )
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className={styles.avatar}>
          <Avatar address={address} />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.DropdownMenuContent} sideOffset={5}>
          {menu.map((item) => (
            <DropdownMenu.Item className={styles.DropdownMenuItem} key={item.slug}>
              {item.href ? (
                <Link to={item.href} className={styles.link}>
                  {item.text}
                  {item.rightSlot && <span className={styles.RightSlot}>{item.rightSlot}</span>}
                </Link>
              ) : (
                <button className={styles.button}>
                  {item.text}
                  {item.rightSlot && <span className={styles.RightSlot}>{item.rightSlot}</span>}
                </button>
              )}
            </DropdownMenu.Item>
          ))}

          <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />

          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            <button className={styles.button} onClick={() => logout()}>
              Log out <div className={styles.RightSlot}>⌘+E</div>
            </button>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
