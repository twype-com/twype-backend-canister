import { MainLayout } from "@/features/layout/MainLayout/MainLayout"
import { Providers } from "@/providers"
import { FC } from "react"
import { BrowserRouter } from "react-router-dom"
import { Routes, Route } from 'react-router'
import { ScrollArea, Theme } from '@radix-ui/themes'

export const App: FC = () => {
  console.log('🚀 ~ process.env:', import.meta.env)
  console.log('🚀 ~ process.env.DFX_NETWORK:', import.meta.env.DFX_NETWORK)

  return (
    <Providers>
      <Theme>
        <ScrollArea type="always" scrollbars="vertical" style={{ height: '100vh' }}>
          <BrowserRouter>
            <MainLayout />
            <Routes>
              <Route />
            </Routes>
          </BrowserRouter>
        </ScrollArea>
      </Theme>
    </Providers>
  )
}
