import { FC } from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { RoomDevPage } from '@/pages/rooms/RoomDevPage'
// import { RoomsListPage } from "@/pages/rooms/RoomsListPage";
// import { RoomCreatePage } from "@/pages/rooms/RoomCreatePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      {/* <Route path="catalog" element={<CatalogPage />} /> */}

      <Route path="rooms">
        <Route path="dev" element={<RoomDevPage />} />
        {/* <Route index element={<RoomsListPage />} /> */}
        {/* <Route path="create" element={<RoomCreatePage />} /> */}
        {/* <Route path="create" element={<RoomCreatePage />} /> */}
        {/* <Route path=":roomId" element={<RoomPage />} /> */}
        {/* <Route path=":roomId/join" element={<RoomPageJoin />} /> */}
      </Route>
    </Route>,
  ),
)

export const Router: FC = () => {
  return <RouterProvider router={router} />
}
