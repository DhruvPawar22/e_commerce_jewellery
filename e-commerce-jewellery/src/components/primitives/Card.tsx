import type { HTMLAttributes } from 'react'
import styles from './Card.module.css'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'md' | 'lg' | 'xl'
  shadow?: boolean
}

export function Card({
  padding = 'md',
  shadow = false,
  className,
  children,
  ...props
}: CardProps) {
  const classes = [
    styles.card,
    styles[`padding-${padding}`],
    shadow ? styles.shadow : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
