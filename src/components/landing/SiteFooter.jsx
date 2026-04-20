function SocialIcon({ platform }) {
  if (platform === 'x') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.9 2H22l-6.77 7.74L23.2 22h-6.26l-4.9-7.43L5.53 22H2.4l7.24-8.28L1.98 2h6.42l4.43 6.76L18.9 2Zm-1.1 18h1.73L7.46 3.9H5.6Z"
        />
      </svg>
    );
  }

  if (platform === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56c0-1.08-.81-1.94-1.91-1.94s-1.91.86-1.91 1.94c0 1.06.79 1.94 1.88 1.94h.03c1.12 0 1.91-.88 1.91-1.94ZM20 13.02C20 9.56 18.15 8 15.68 8c-2 0-2.89 1.1-3.39 1.87V8.5H8.91c.04.91 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.92.27-.68.88-1.38 1.9-1.38 1.34 0 1.88 1.03 1.88 2.53V20H20v-6.98Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.32 4.37A17.43 17.43 0 0 0 16.18 3a11.8 11.8 0 0 0-.53 1.1 16.14 16.14 0 0 0-7.3 0A10.37 10.37 0 0 0 7.82 3a17.32 17.32 0 0 0-4.15 1.38C1.05 8.3.34 12.11.7 15.87a17.7 17.7 0 0 0 5.1 2.6c.41-.56.78-1.15 1.1-1.77-.61-.23-1.2-.51-1.75-.84.15-.11.29-.22.43-.34a12.5 12.5 0 0 0 10.84 0l.43.34c-.56.33-1.15.61-1.76.84.32.62.69 1.21 1.11 1.77a17.63 17.63 0 0 0 5.1-2.6c.42-4.36-.72-8.13-2.98-11.5ZM8.75 13.56c-1 0-1.81-.92-1.81-2.05 0-1.13.8-2.05 1.8-2.05 1 0 1.82.93 1.81 2.05 0 1.13-.8 2.05-1.8 2.05Zm6.5 0c-1 0-1.8-.92-1.8-2.05 0-1.13.8-2.05 1.8-2.05 1 0 1.82.93 1.81 2.05 0 1.13-.8 2.05-1.8 2.05Z"
      />
    </svg>
  );
}

export function SiteFooter({
  footerColumns,
  socialLinks,
  logoHref = '#top',
  brandDescription = 'Bulid, own, and monetize your community “Hive” with real web3 ownership. No Algorithms, no intermediaries, no limits.',
  copyrightText = '© 2026 Hive3. All rights reserved. Built for the decentralized future.',
}) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div>
            <a className="nav-logo footer-logo" href={logoHref}>
              <img className="nav-logo-image" src="/hive3-logo.svg" alt="Hive3" />
            </a>
            <p className="footer-brand-desc">
              {brandDescription}
            </p>
          </div>

          {footerColumns.map(column => (
            <div key={column.title}>
              <div className="footer-col-title">{column.title}</div>
              <ul className="footer-links">
                {column.links.map(link => (
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
            {copyrightText}
          </p>
          <div className="footer-socials">
            {socialLinks.map(social => (
              <a
                className="social-icon"
                href={social.href}
                key={social.label}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                title={social.label}
              >
                <SocialIcon platform={social.platform} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
