/* eslint-disable @typescript-eslint/ban-types */
import { FC } from 'react'
import { Article } from '@/components/Article/Article'
import { useInternetIdentity } from '@/hooks/useInternetIdentity'
import { ProfileDetails } from '../ProfileDetails/ProfileDetails'
import { ProfileUser } from '../ProfileUser/ProfileUser'
import { UserProfile } from '../types'

type ProfileLoaderProps = {}

export const ProfileLoader: FC<ProfileLoaderProps> = () => {
  const { address } = useInternetIdentity()

  const fakeUser: UserProfile = {
    nickName: address,
    links: [{ title: 'Twitter', link: 'https://twitter.com/' }],
    description: 'I love cookies. I hope you all love them as much as I do. Good luck!',
    // photoUrl:
    //   'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop',
    subscribers: 5409,
    subscriptions: 23,
    isOnline: true,
    address,
  }

  return (
    <Article title="Profile" backUrl="/">
      <ProfileUser profile={fakeUser} />
      <ProfileDetails profile={fakeUser} />
      {/* {isOwner && <UserRooms />} */}
    </Article>
  )
}
