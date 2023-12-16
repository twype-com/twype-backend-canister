export type ProfileLink = {
  title: string
  link: string
}

export type UserProfile = {
  fullName?: string
  nickName: string
  description?: string
  links?: ProfileLink[]
  photoUrl?: string
  subscribers: number
  subscriptions: number
  isOnline: boolean
  address: string
}

export type TradeRoom = {
  id: string
  name: string
  participants: number
  price: number
  own: number
}
