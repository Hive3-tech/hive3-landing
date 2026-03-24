export function SiteFooter({ footerColumns, socialLinks }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div>
            <a className="nav-logo footer-logo" href="#top">
              <img className="nav-logo-image" src="/hive3-logo.svg" alt="Hive3" />
            </a>
            <p className="footer-brand-desc">
              The Web3-native community platform. Build, own, and monetize your
              audience without algorithms or intermediaries.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <div className="footer-col-title">{column.title}</div>
              <ul className="footer-links">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 Hive3. All rights reserved. Built for the decentralized future.
          </p>
          <div className="footer-socials">
            {socialLinks.map((social) => (
              <a className="social-icon" href={social.href} key={social.label}>
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
