import { TradeRoom } from '@/features/account/types'
import { TradingModal } from '@/features/trading/TradingModal/TradingModal'
import { useInternetIdentity } from '@/hooks/useInternetIdentity'
import { fromDecimals } from '@/utils/fromDecimals'
import { Button } from '@radix-ui/themes'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'

export const RoomInfo: FC = () => {
  const { balance, buy, sell } = useInternetIdentity()

  const roomBuyPrice = useMemo(() => balance?.roomTokenBuyPrice ? fromDecimals(Number(balance?.roomTokenBuyPrice)) : null, [balance?.roomTokenBuyPrice])

  const roomSellPrice = useMemo(() => balance?.roomTokenSellPrice ? fromDecimals(Number(balance?.roomTokenSellPrice)) : null, [balance?.roomTokenSellPrice])
  
  const roomBalance = useMemo(() => balance?.roomBalance ? balance.roomBalance.toLocaleString() : null, [balance?.roomBalance])

  const room = {
    id: '1',
    name: 'Room name',
    participants: 493,
    price: 45,
    own: 2,
  } as TradeRoom

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeRoomBuy, setActiveRoomBuy] = useState<TradeRoom | null>(null)
  const [activeRoomSell, setActiveRoomSell] = useState<TradeRoom | null>(null)

  useEffect(() => {
    if (!isDialogOpen) {
      setTimeout(() => {
        setActiveRoomBuy(null)
        setActiveRoomSell(null)
      }, 300)
    }
  }, [isDialogOpen])

  const startSell = useCallback((room: TradeRoom) => {
    setActiveRoomSell(room)
    setIsDialogOpen(true)
  }, [])

  const startBuy = useCallback((room: TradeRoom) => {
    setActiveRoomBuy(room)
    setIsDialogOpen(true)
  }, [])

  const handleSell = useCallback((num: number) => {
    console.log('🚀 ~ handleSell ~ num:', num)
    setIsDialogOpen(false)

    if (sell) {
      sell(num)
    }
  }, [sell])

  const handleBuy = useCallback((num: number) => {
    console.log('🚀 ~ handleBuy ~ num:', num)
    setIsDialogOpen(false)

    if (buy) {
      buy(num)
    }
  }, [buy])

  return (
    <div>
      <p>
        <i>The place for nice description and actions</i>
      </p>
      <p>Current ticket price: {roomBuyPrice ? `${roomBuyPrice?.toLocaleString()} ICP` : null}</p>
      <p>You have: {roomBalance} tickets</p>

      <div>
        <Button color="pink" radius="full" size="2" onClick={() => startSell(room)}>
          Sell
        </Button>

        <Button color="teal" radius="full" size="2" onClick={() => startBuy(room)}>
          Buy
        </Button>
      </div>

      <TradingModal
        isOpen={isDialogOpen}
        room={activeRoomBuy || activeRoomSell}
        tradeType={activeRoomSell ? 'sell' : 'buy'}
        price={activeRoomSell ? roomSellPrice ?? 0 : roomBuyPrice ?? 0}
        onSell={handleSell}
        onBuy={handleBuy}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  )
}
