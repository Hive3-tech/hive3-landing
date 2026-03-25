const APP_LOGIN_URL = 'https://app.hive3.tech/login'

export function SiteHeader({ navLinks, menuOpen, onCloseMenu, onToggleMenu }) {
  return (
    <header className="site-nav">
      <div className="nav-shell">
        <a className="nav-logo" href="#top" onClick={onCloseMenu}>
          <img className="nav-logo-image" src="/hive3-logo.svg" alt="Hive3" />
        </a>

        <button
          type="button"
          className={`nav-toggle${menuOpen ? ' is-open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={onToggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-panel${menuOpen ? ' is-open' : ''}`}>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={onCloseMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-ctas">
            <a
              className="btn btn-ghost"
              href={APP_LOGIN_URL}
              target="_blank"
              rel="noreferrer"
              onClick={onCloseMenu}
            >
              Log in
            </a>
            <a
              className="btn btn-primary"
              href={APP_LOGIN_URL}
              target="_blank"
              rel="noreferrer"
              onClick={onCloseMenu}
            >
              Get started <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
