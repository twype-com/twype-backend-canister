import { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider as QueryClientProviderLib } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return <QueryClientProviderLib client={queryClient}>{children}</QueryClientProviderLib>
}
