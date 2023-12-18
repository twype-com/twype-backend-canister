import { Fragment } from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { RoomDevPage } from '@/pages/rooms/RoomDevPage'
import { MePage } from './pages/users/MePage'
// import { RoomsListPage } from "@/pages/rooms/RoomsListPage";
// import { RoomCreatePage } from "@/pages/rooms/RoomCreatePage";

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    index: true,
  },
  { path: '/rooms', children: [{ path: 'dev', element: <RoomDevPage /> }] },
  { path: '/users', children: [{ path: ':address', element: <MePage /> }] },
]

export default function AppRouter() {
  const elements = useRoutes(routes)
  window.scroll(0, 0)
  return <Fragment>{elements}</Fragment>
}
