import { TradeRoom } from '@/features/account/types'
import { TradingModal } from '@/features/trading/TradingModal/TradingModal'
import { Button } from '@radix-ui/themes'
import { FC, useCallback, useEffect, useState } from 'react'

export const RoomInfo: FC = () => {
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
  }, [])

  const handleBuy = useCallback((num: number) => {
    console.log('🚀 ~ handleBuy ~ num:', num)
    setIsDialogOpen(false)
  }, [])

  return (
    <div>
      <p>
        <i>The place for nice description and actions</i>
      </p>
      <p>Current ticket price: {room.price}</p>
      <p>493 users in the room</p>

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
        price={room.price}
        onSell={handleSell}
        onBuy={handleBuy}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  )
}
