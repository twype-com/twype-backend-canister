import { FC, PropsWithChildren } from 'react'
import { QueryClientProvider } from './QueryClientProvider'
import { InternetIdentityProvider } from './InternetIdentityProvider'
import { } from '@radix-ui/themes'

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider>
      <InternetIdentityProvider>
        {children}
      </InternetIdentityProvider>
    </QueryClientProvider>
  )
}
