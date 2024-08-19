import { Outlet } from 'react-router-dom'

import { MainLayoutHeader } from '~/modules/main-layout/MainLayoutHeader'

export const loader = async () => {
  // const session = await getSession()

  // if (!session) {
  //   return redirect('/login')
  // }

  return null
}
export const Component: Component = () => {
  return (
    <div>
      <MainLayoutHeader />
      <Outlet />
    </div>
  )
}
