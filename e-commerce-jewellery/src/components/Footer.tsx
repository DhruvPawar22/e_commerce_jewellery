import styles from "../components/Footer.module.css"

const whatsappNumber = "919876543210"
const whatsappLink = `https://wa.me/${whatsappNumber}`

const shopLinks = [
  { label: "All Products", path: "/shop" },
  { label: "Bags", path: "/shop?category=bags" },
  { label: "Jewellery", path: "/shop?category=jewellery" },
]

const infoLinks = [
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Shipping & Returns", path: "/shipping-returns" },
  { label: "hello@curebydesignshop.com", path: "mailto:hello@curebydesignshop.com" },
]

export function Footer()
{
    return(
        <footer className={styles.footer}>
            <div className={styles.grid}>
                <div>
                    <div className={styles.brand}>Cure by Design</div>
                    <p className={styles.tagline}>
                        A small, curated shop for handcrafted bags and artisanal jewellery.
                    </p>
                    <a href={whatsappLink} className={styles.whatsappLink}>
                        Message us on WhatsApp
                    </a>
                </div>

                <div>
                    <h5 className={styles.columnHeading}>Shop</h5>
                    <ul className={styles.linkList}>
                        {shopLinks.map((item) => (
                            <li key={item.path}>
                                <a href={item.path}>{item.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h5 className={styles.columnHeading}>Info</h5>
                    <ul className={styles.linkList}>
                        {infoLinks.map((item) => (
                            <li key={item.path}>
                                <a href={item.path}>{item.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={styles.bottomBar}>
                © 2026 Cure by Design. All rights reserved.
            </div>
        </footer>
    )
}
