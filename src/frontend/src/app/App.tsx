import { FC, useEffect } from 'react'
import { Providers } from '@/providers'
import AppRouter from '@/Router'
import { ScrollArea, Theme } from '@radix-ui/themes'
import { Outlet } from 'react-router'

export const App: FC = () => {
  console.log('🚀 ~ import.meta.env:', import.meta.env)
  console.log('🚀 ~ DFX_NETWORK:', import.meta.env.DFX_NETWORK)
  console.log('🚀 ~ VITE_DFX_CANISTER_ID:', import.meta.env.VITE_DFX_CANISTER_ID)

  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const canisterId = urlParams.get('canisterId')
  console.log(canisterId)

  useEffect(() => {
    if (import.meta.env.VITE_DFX_NETWORK === 'local') {
      const localCanisterId = localStorage.getItem('canisterId')
      if (!localCanisterId && !!canisterId && localCanisterId !== 'undefined') {
        localStorage.setItem('canisterId', import.meta.env.VITE_DFX_CANISTER_ID || canisterId)
      }
    }
  }, [canisterId])

  return (
    <Providers>
      <Theme>
        <ScrollArea type="always" scrollbars="vertical" style={{ height: '100vh' }}>
          <AppRouter />
          <Outlet />
        </ScrollArea>
      </Theme>
    </Providers>
  )
}
