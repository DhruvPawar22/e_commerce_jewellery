// Placeholder brand from the design handoff — swap this one string when the
// real name is decided instead of hunting through every component.
export const BRAND_NAME = 'Cure by Design'

export const BRAND_TAGLINE = 'A small, curated shop for handcrafted bags and artisanal jewellery.'

export const WHATSAPP_NUMBER = '919876543210'

export const CONTACT_EMAIL = 'hello@curebydesignshop.com'

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const

export const FOOTER_SHOP_LINKS = [
  { label: 'All Products', to: '/shop' },
  { label: 'Bags', to: '/shop?category=Bags' },
  { label: 'Jewellery', to: '/shop?category=Jewellery' },
] as const

export const FOOTER_INFO_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Shipping & Returns', to: '/shipping-returns' },
] as const
