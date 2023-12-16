import { FC } from 'react'
import { MainLayout } from '@/features/layout/MainLayout/MainLayout'
import { Article } from '@/components/Article/Article'
import { RoomInfo } from '@/features/rooms/RoomInfo/RoomInfo'

export const RoomDevPage: FC = () => {
  return (
    <MainLayout>
      <Article title="Test token gated call room" backUrl="/rooms">
        <RoomInfo />
      </Article>
    </MainLayout>
  )
}
