import { FC, PropsWithChildren, useState } from 'react'
import { QueryClient, QueryClientProvider as QueryClientProviderLib } from '@tanstack/react-query'

export const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient())

  return <QueryClientProviderLib client={queryClient}>{children}</QueryClientProviderLib>
}
