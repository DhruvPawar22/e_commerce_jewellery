import { Link } from 'react-router-dom'
import {
  BRAND_NAME,
  BRAND_TAGLINE,
  CONTACT_EMAIL,
  FOOTER_INFO_LINKS,
  FOOTER_SHOP_LINKS,
  whatsappLink,
} from '../../constants/brand'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.brandName}>{BRAND_NAME}</div>
          <p className={styles.tagline}>{BRAND_TAGLINE}</p>
          <a href={whatsappLink()} className={styles.whatsapp}>
            Message us on WhatsApp
          </a>
        </div>

        <div>
          <h5 className={styles.columnHeading}>Shop</h5>
          <ul className={styles.linkList}>
            {FOOTER_SHOP_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className={styles.columnHeading}>Info</h5>
          <ul className={styles.linkList}>
            {FOOTER_INFO_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
      </div>
    </footer>
  )
}
