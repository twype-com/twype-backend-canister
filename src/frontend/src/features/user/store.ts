import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
  walletAddress: string | null
  livekitToken: string | null
}

type Action = {
  updateWalletAddress: (walletAddress: State['walletAddress']) => void
  updateLivekitToken: (livekitToken: State['livekitToken']) => void
  logout: () => void
}

const useUserStore = create<State & Action>()(
  persist(
    set => ({
      walletAddress: null,
      livekitToken: null,
      updateWalletAddress: walletAddress => set(() => ({ walletAddress: walletAddress })),
      updateLivekitToken: livekitToken => set(() => ({ livekitToken: livekitToken })),
      logout: () => set(() => ({ walletAddress: null, livekitToken: null })),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useUserStore
