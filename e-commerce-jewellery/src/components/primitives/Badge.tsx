import styles from './Badge.module.css'

interface BadgeProps {
  count: number
}

// Positions itself absolutely against a `position: relative` parent — see
// the cart icon wrapper in Header.
export function Badge({ count }: BadgeProps) {
  return <span className={styles.badge}>{count}</span>
}
