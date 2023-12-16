import { FC } from 'react'
import { Providers } from '@/providers'
import { Router } from '@/Router'
import { ScrollArea, Theme } from '@radix-ui/themes'

export const App: FC = () => {
  console.log('🚀 ~ process.env:', import.meta.env)
  console.log('🚀 ~ process.env.DFX_NETWORK:', import.meta.env.DFX_NETWORK)

  return (
    <Providers>
      <Theme>
        <ScrollArea type="always" scrollbars="vertical" style={{ height: '100vh' }}>
          <Router />
        </ScrollArea>
      </Theme>
    </Providers>
  )
}
