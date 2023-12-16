export enum MenuItemName {
  HOME = 'home',
  FOLLOWING = 'following',
  EXPLORE = 'explore',
  LIVE = 'live',
  INBOX = 'inbox',
  ME = 'me',
  UPLOAD = 'upload',
}

export type MenuItem = {
  name: MenuItemName
  text: string
  slug: string
  icon: React.ReactNode
  isActive?: boolean
  isAccent?: boolean
}
