import { FC, useCallback, useEffect, useState } from 'react'
import { Button, Dialog } from '@radix-ui/themes'
import { TradeRoom } from '@/features/account/types'
import Input from '@/components/Input/Input'
import styles from './TradingModal.module.scss'

type TradingModalProps = {
  isOpen: boolean
  room?: TradeRoom | null
  tradeType: 'sell' | 'buy'
  price: number
  onSell?: (num: number) => void
  onBuy?: (num: number) => void
  onOpenChange?: (open: boolean) => void
}

export const TradingModal: FC<TradingModalProps> = ({
  isOpen,
  tradeType,
  price,
  onSell,
  onBuy,
  onOpenChange,
}) => {
  const [ticketsValue, setTicketsValue] = useState(0)

  const sellOrBuy = tradeType === 'sell' ? 'Sell' : 'Buy'

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
        <Dialog.Title>Trade tickets</Dialog.Title>

        <Dialog.Description size="2" mb="4">
          {sellOrBuy}{' '}
          <Input
            value={String(ticketsValue)}
            type="number"
            className={styles.input}
            min={0}
            onChange={(e) => setTicketsValue(Number(e.target.value))}
          />{' '}
          tickets for {(price * ticketsValue).toFixed(5)} ICP
        </Dialog.Description>

        {/* <Callout.Root color="red">
          <Callout.Icon>
            <Info size={32} />
          </Callout.Icon>
          <Callout.Text>
            {tradeType === 'sell'
              ? 'You can sell tickets only if you are have the tickets'
              : "You can buy tickets and don't cry"}
          </Callout.Text>
        </Callout.Root> */}

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
