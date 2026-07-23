import styles from './Divider.module.css'

interface DividerProps {
  className?: string
}

// The repeating-dashed-gradient rule used throughout the design handoff
// instead of solid borders (cart rows, product-detail section split, etc).
export function Divider({ className }: DividerProps) {
  return <div className={[styles.divider, className].filter(Boolean).join(' ')} role="separator" />
}
