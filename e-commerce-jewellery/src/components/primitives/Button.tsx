import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'outline' | 'success' | 'text'
type ButtonSize = 'md' | 'lg'

type ButtonOwnProps<T extends ElementType> = {
  as?: T
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: ReactNode
}

type ButtonProps<T extends ElementType> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>

// Polymorphic so the same visual styles work for a real <button> (Add to
// Cart, quantity controls) and a <Link>/<a> styled identically (Continue
// Shopping, WhatsApp CTA, mailto links) — the design handoff uses both for
// what is visually the same button.
export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps<T> & { className?: string }) {
  const Component = as || 'button'
  const classes = [
    styles.button,
    styles[variant],
    variant !== 'text' ? styles[size] : '',
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
