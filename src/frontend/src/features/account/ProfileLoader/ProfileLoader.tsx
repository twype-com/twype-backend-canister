import { FC } from 'react'
import useUserStore from '@/features/user/store'
import { Article } from '@/components/Article/Article'
import { ProfileUser } from '../ProfileUser/ProfileUser'
import { ProfileDetails } from '../ProfileDetails/ProfileDetails'
import { UserRooms } from '../UserRooms/UserRooms'
import { UserProfile } from '../types'
import { shortenAddress } from '@/utils/common'

type ProfileLoaderProps = {
  address: string
}

export const ProfileLoader: FC<ProfileLoaderProps> = ({ address }) => {
  const userAddress = useUserStore((state) => state.walletAddress)

  const isOwner = userAddress === address

  const fakeUser: UserProfile = {
    nickName: shortenAddress(address),
    links: [{ title: 'Twitter', link: 'https://twitter.com/' }],
    description: 'I love cookies. I hope you all love them as much as I do. Good luck!',
    // photoUrl:
    //   'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop',
    subscribers: 5409,
    subscriptions: 23,
    isOnline: true,
  }

  return (
    <Article title="Profile" backUrl="/">
      <ProfileUser profile={fakeUser} />
      <ProfileDetails profile={fakeUser} />
      {isOwner && <UserRooms />}
    </Article>
  )
}
