import { FC, useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import { Button } from '@radix-ui/themes'
import { BalanceModal } from '@/features/trading/BalanceModal/BalanceModal'
import styles from './ProfileBalance.module.scss'

type ProfileBalanceProps = {
  className?: string
}

export const ProfileBalance: FC<ProfileBalanceProps> = ({ className }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tradingType, setTradingType] = useState<'sell' | 'buy' | null>(null)

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

  const handleSell = useCallback(() => {
    setIsDialogOpen(false)
  }, [])

  const handleBuy = useCallback(() => {
    setIsDialogOpen(false)
  }, [])

  return (
    <div className={cn(styles.balance, className)}>
      <div className={styles.current}>
        Twype balance: <b>45 ICP</b>
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
