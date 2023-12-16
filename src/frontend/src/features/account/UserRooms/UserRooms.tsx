import { FC, useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import { Button } from '@radix-ui/themes'
import { TradeRoom } from '@/features/account/types'
import rooms from '@/mocks/user-rooms.json'
import { TradingModal } from '@/features/trading/TradingModal/TradingModal'
import styles from './UserRooms.module.scss'

type UserRoomsProps = {
  className?: string
}

export const UserRooms: FC<UserRoomsProps> = ({ className }) => {
  const tradeRooms = rooms as TradeRoom[]

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
    <section className={cn(styles.rooms, className)}>
      <h2 className={styles.title}>Your rooms</h2>
      <ul className={styles.list}>
        <li className={cn(styles.item, styles.itemHeader)}>
          <span className={styles.name}>Room name</span>
          <span className={styles.participants}>Users</span>
          <span className={styles.price}>Price</span>
          <span className={styles.own}>Tickets</span>
          <span className={styles.sell} />
          <span className={styles.buy} />
        </li>
        {tradeRooms.map((room) => (
          <li className={styles.item} key={room.id}>
            <span className={styles.name}>{room.name}</span>
            <span className={styles.participants}>{room.participants}</span>
            <span className={styles.price}>{room.price}</span>
            <span className={styles.own}>{room.own}</span>
            <div className={styles.sell}>
              <Button
                color="pink"
                radius="full"
                size="2"
                disabled={!room.own}
                onClick={() => startSell(room)}
              >
                Sell
              </Button>
            </div>
            <div className={styles.buy}>
              <Button color="teal" radius="full" size="2" onClick={() => startBuy(room)}>
                Buy
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <TradingModal
        isOpen={isDialogOpen}
        room={activeRoomBuy || activeRoomSell}
        tradeType={activeRoomSell ? 'sell' : 'buy'}
        price={45}
        onSell={handleSell}
        onBuy={handleBuy}
        onOpenChange={setIsDialogOpen}
      />
    </section>
  )
}
