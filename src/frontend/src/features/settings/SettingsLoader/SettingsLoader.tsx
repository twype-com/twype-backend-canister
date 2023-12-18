import { FC } from 'react'
import { Article } from '@/components/Article/Article'
import { SettingsForm } from '../SettingsForm/SettingsForm'

export const SettingsLoader: FC = () => {
  return (
    <Article title="Settings" backUrl="/">
      <SettingsForm />
    </Article>
  )
}
