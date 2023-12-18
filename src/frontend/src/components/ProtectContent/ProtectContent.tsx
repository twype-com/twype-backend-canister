import { FC, PropsWithChildren } from 'react'
import { Button } from '@radix-ui/themes'
import useUserStore from '@/features/user/store'
import { TMP_WALLET_ADDRESS } from '@/features/user/constants'
import styles from './ProtectContent.module.scss'

export const ProtectContent: FC<PropsWithChildren> = ({ children }) => {
  const address = useUserStore((state) => state.walletAddress)
  const login = useUserStore((state) => state.updateWalletAddress)

  return (
    <>
      {!address ? (
        <div className={styles.container}>
          <div className={styles.content}>
            <h2 className={styles.title}>Please, connect wallet</h2>
            <div className={styles.wallet}>
              <Button variant="outline" onClick={() => login(TMP_WALLET_ADDRESS)}>
                Connect wallet
              </Button>
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}
