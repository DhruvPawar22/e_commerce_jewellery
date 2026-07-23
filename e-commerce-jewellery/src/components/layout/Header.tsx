import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { BRAND_NAME, NAV_LINKS } from '../../constants/brand'
import { Badge } from '../primitives/Badge'
import styles from './Header.module.css'

interface HeaderProps {
  cartCount?: number
}

export function Header({ cartCount = 0 }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brandBox}>
        <Link to="/" className={styles.logo}>
          {BRAND_NAME}
        </Link>
      </div>

      <div className={styles.navBox}>
        <nav className={styles.nav}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    [styles.link, isActive ? styles.active : ''].filter(Boolean).join(' ')
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/cart" className={styles.cartLink} aria-label="View cart">
          <ShoppingBag size={24} strokeWidth={1.5} />
          {cartCount > 0 && <Badge count={cartCount} />}
        </Link>
      </div>
    </header>
  )
}
