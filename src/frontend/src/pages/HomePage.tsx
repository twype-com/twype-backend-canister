import { FC } from 'react'
import { MainLayout } from '@/features/layout/MainLayout/MainLayout'
import { Feed } from '@/features/explore/Feed/Feed'
import { PostPreview } from '@/features/explore/PostPreview/PostPreview'

export const HomePage: FC = () => {
  const fakeContent = Array.from({ length: 9 }, (_, i) => i + 1)

  return (
    <MainLayout>
      <Feed>
        {fakeContent.map((item) => (
          <PostPreview key={item} title="Name of the stream" />
        ))}
      </Feed>
    </MainLayout>
  )
}
