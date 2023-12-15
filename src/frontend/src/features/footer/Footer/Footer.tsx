import { FC } from 'react'
import cn from 'classnames'
import { MenuItemName } from '@/features/navigation/types'
import { MainMenu } from '@/features/navigation/MainMenu/MainMenu'
import styles from './Footer.module.scss'

type FooterProps = {
  className?: string
}

export const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn(styles.footer, className)}>
      <MainMenu
        isHorizontal
        items={[
          MenuItemName.HOME,
          MenuItemName.EXPLORE,
          MenuItemName.UPLOAD,
          MenuItemName.INBOX,
          MenuItemName.ME,
        ]}
      />
    </footer>
  )
}
