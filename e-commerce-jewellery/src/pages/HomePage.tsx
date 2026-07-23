import { SectionHeading } from '../components/primitives/SectionHeading'

export function HomePage() {
  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: '0 64px' }}>
      <SectionHeading as="h1" size="xl" italic eyebrow="Curated Collection">
        Bags and jewellery, chosen for the craft behind them
      </SectionHeading>
    </div>
  )
}
