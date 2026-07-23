import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  // cartCount is hardcoded until cart state (context/store) is wired up.
  return (
    <>
      <Header cartCount={10} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
