import type { SVGProps } from 'react'

interface WhatsAppIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string
}

// Brand mark kept as a hand-authored SVG (matches the design handoff's Cart
// checkout button) since generic icon sets like lucide-react don't ship
// recognizable brand glyphs.
export function WhatsAppIcon({ size = 24, ...props }: WhatsAppIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M17.6 6.3A8.9 8.9 0 0 0 12 4a9 9 0 0 0-7.8 13.4L3 21l3.7-1.2A9 9 0 1 0 17.6 6.3ZM12 19.4a7.4 7.4 0 0 1-3.8-1l-.3-.2-2.6.8.8-2.5-.2-.3A7.4 7.4 0 1 1 19.4 12 7.4 7.4 0 0 1 12 19.4Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.5.1-.5.7-.7.8-.3.1-.5 0a6 6 0 0 1-1.8-1.1 6.5 6.5 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.4l.3-.4.2-.3v-.3c0-.1-.5-1.3-.7-1.8s-.4-.4-.5-.4h-.4a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2 4.6 4.6 0 0 0 1 2.5 10.6 10.6 0 0 0 4 3.6c.6.2 1 .4 1.4.5a3.3 3.3 0 0 0 1.5.1 2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3Z" />
    </svg>
  )
}
