// import { MainLayout } from '@/features/layout/MainLayout/MainLayout'
import { FC } from 'react'
import { AccessGuard } from '@/components/AccessGuard/AccessGuard'

export const NotFoundPage: FC = () => {
  return <AccessGuard title="Page not found" />
}
