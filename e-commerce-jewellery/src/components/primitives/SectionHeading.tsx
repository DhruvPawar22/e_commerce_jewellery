import type { ReactNode } from 'react'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  eyebrow?: string
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  italic?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  children,
  as: Heading = 'h2',
  align = 'left',
  size = 'md',
  italic = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={[styles.wrapper, styles[align], className].filter(Boolean).join(' ')}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <Heading
        className={[styles.heading, styles[size], italic ? styles.italic : '']
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </Heading>
    </div>
  )
}
