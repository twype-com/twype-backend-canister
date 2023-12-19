import { FC, useCallback, useEffect, useState } from 'react'
import { Button } from '@radix-ui/themes'
import cn from 'classnames'
import { BalanceModal } from '@/features/trading/BalanceModal/BalanceModal'
import { useInternetIdentity } from '@/hooks/useInternetIdentity'
import { fromDecimals } from '@/utils/fromDecimals'
import { toDecimals } from '@/utils/toDecimals'
import styles from './ProfileBalance.module.scss'

type ProfileBalanceProps = {
  className?: string
}

export const ProfileBalance: FC<ProfileBalanceProps> = ({ className }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tradingType, setTradingType] = useState<'sell' | 'buy' | null>(null)
  const { balance, deposit, withdraw } = useInternetIdentity()

  useEffect(() => {
    if (!isDialogOpen) {
      setTimeout(() => {}, 300)
    }
  }, [isDialogOpen])

  const startSell = useCallback(() => {
    setIsDialogOpen(true)
    setTradingType('sell')
  }, [])

  const startBuy = useCallback(() => {
    setIsDialogOpen(true)
    setTradingType('buy')
  }, [])

  const handleSell = useCallback(
    (num: number) => {
      console.log('🚀 ~ handleSell ~ num:', num)
      setIsDialogOpen(false)

      if (withdraw) {
        withdraw(toDecimals(num))
      }
    },
    [withdraw],
  )

  const handleBuy = useCallback(
    (num: number) => {
      console.log('🚀 ~ handleBuy ~ num:', num)
      setIsDialogOpen(false)

      if (deposit) {
        deposit(toDecimals(num))
      }
    },
    [deposit],
  )

  return (
    <div className={cn(styles.balance, className)}>
      <div className={styles.current}>
        Twype balance:{' '}
        <b>
          {balance?.dexBalance
            ? fromDecimals(Number(balance?.dexBalance)).toLocaleString()
            : '0.00'}{' '}
          ICP
        </b>
      </div>
      <div className={styles.actions}>
        <div className={styles.buy}>
          <Button color="teal" radius="full" size="2" onClick={() => startBuy()}>
            Deposit
          </Button>
        </div>
        <div className={styles.sell}>
          <Button color="pink" radius="full" size="2" onClick={() => startSell()}>
            Withdraw
          </Button>
        </div>
      </div>

      <BalanceModal
        isOpen={isDialogOpen}
        tradeType={tradingType === 'sell' ? 'sell' : 'buy'}
        title={tradingType === 'sell' ? 'Withdraw' : 'Deposit'}
        onSell={handleSell}
        onBuy={handleBuy}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  )
}
