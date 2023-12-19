import { FC, PropsWithChildren } from 'react'
import '@radix-ui/themes'
import { InternetIdentityProvider } from './InternetIdentityProvider'
import { QueryClientProvider } from './QueryClientProvider'

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider>
      <InternetIdentityProvider>{children}</InternetIdentityProvider>
    </QueryClientProvider>
  )
}
