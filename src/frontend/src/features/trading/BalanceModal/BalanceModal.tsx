import { FC, useCallback, useEffect, useState } from 'react'
import { Button, Dialog } from '@radix-ui/themes'
import { TradeRoom } from '@/features/account/types'
import Input from '@/components/Input/Input'
import styles from './BalanceModal.module.scss'

type BalanceModalProps = {
  isOpen: boolean
  room?: TradeRoom | null
  tradeType: 'sell' | 'buy'
  title: string
  onSell?: (num: number) => void
  onBuy?: (num: number) => void
  onOpenChange?: (open: boolean) => void
}

export const BalanceModal: FC<BalanceModalProps> = ({
  isOpen,
  tradeType,
  title,
  onSell,
  onBuy,
  onOpenChange,
}) => {
  const [ticketsValue, setTicketsValue] = useState(0)

  const sellOrBuy = tradeType === 'sell' ? 'Withdraw' : 'Deposit'

  useEffect(() => {
    setTicketsValue(0)
  }, [isOpen])

  const handleTrade = useCallback(() => {
    if (!ticketsValue) return
    tradeType === 'sell' ? onSell?.(ticketsValue) : onBuy?.(ticketsValue)
  }, [onBuy, onSell, ticketsValue, tradeType])

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Content style={{ maxWidth: 320 }}>
        <Dialog.Title>{title}</Dialog.Title>

        <Dialog.Description size="2" mb="4">
          <Input
            value={String(ticketsValue)}
            type="number"
            className={styles.input}
            onChange={(e) => setTicketsValue(Number(e.target.value))}
          />{' '}
          ICP
        </Dialog.Description>

        <footer className={styles.footer}>
          <Dialog.Close>
            <Button variant="soft" color="gray" radius="full">
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            color={tradeType === 'sell' ? 'pink' : 'teal'}
            radius="full"
            disabled={!ticketsValue}
            onClick={handleTrade}
          >
            {sellOrBuy}
          </Button>
        </footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
