import { FC } from 'react'
import { MainLayout } from '@/features/layout/MainLayout/MainLayout'
import { Article } from '@/components/Article/Article'
// import useUserStore from '@/features/user/store'
import { UserProfile } from '@/features/account/types'
import { shortenAddress } from '@/utils/common'
import { ProfileUser } from '@/features/account/ProfileUser/ProfileUser'
import { ProfileDetails } from '@/features/account/ProfileDetails/ProfileDetails'
import { UserRooms } from '@/features/account/UserRooms/UserRooms'

export const MePage: FC = () => {
  const address = 'kjasgfvjkahswi37456tyashijkdtyo8q7w'
  // const userAddress = useUserStore((state) => state.walletAddress)

  // const isOwner = userAddress === address
  const isOwner = true

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
    <MainLayout>
      <Article title="Profile" backUrl="/">
        <ProfileUser profile={fakeUser} />
        <ProfileDetails profile={fakeUser} />
        {isOwner && <UserRooms />}
      </Article>
    </MainLayout>
  )
}
