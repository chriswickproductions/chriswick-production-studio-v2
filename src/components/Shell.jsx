import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { profile, services } from '../data/site.js'
import TransitionOverlay from './TransitionOverlay.jsx'
import { useMechanicalSound } from '../hooks/useMechanicalSound.js'

const sections = [
  { label: 'Home', detail: 'Start here', path: '/home', keywords: 'main landing' },
  { label: 'Services', detail: 'Browse all services', path: '/home#services', keywords: 'disciplines armory' },
  { label: 'Selected Work', detail: 'View the portfolio', path: '/home#work', keywords: 'portfolio photos videos campaigns projects' },
  { label: 'About Christopher', detail: 'Background and experience', path: '/about', keywords: 'about profile biography' },
  ...services.map(service => ({
    label: service.title,
    detail: service.subtitle,
    path: `/service/${service.slug}`,
    keywords: `${service.short} ${service.deliverables.join(' ')}`
  }))
]

export default function Shell() {
  const navigate = useNavigate()
  const location = useLocation()
  const playMechanical = useMechanicalSound()
  const [transitioning, setTransitioning] = useState(false)
  const [label, setLabel] = useState('ACCESSING')
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const menuRef = useRef(null)
  const searchRef = useRef(null)

  useEffect(() => {
    setMenuOpen(false)
    setSearch('')
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1))
      const timeout = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
      }), 60)
      return () => window.clearTimeout(timeout)
    }
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!menuOpen) return
    searchRef.current?.focus()
    const dismiss = event => {
      if (event.key === 'Escape') setMenuOpen(false)
      if (event.type === 'pointerdown' && !menuRef.current?.contains(event.target)) setMenuOpen(false)
    }
    document.addEventListener('keydown', dismiss)
    document.addEventListener('pointerdown', dismiss)
    return () => {
      document.removeEventListener('keydown', dismiss)
      document.removeEventListener('pointerdown', dismiss)
    }
  }, [menuOpen])

  const transitionTo = (path, nextLabel = 'ACCESSING') => {
    setMenuOpen(false)
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (transitioning) return
    playMechanical()
    setLabel(nextLabel)
    setTransitioning(true)
    window.setTimeout(() => {
      navigate(path)
      window.scrollTo({ top: 0, behavior: 'auto' })
      window.setTimeout(() => setTransitioning(false), 180)
    }, 720)
  }

  const goTo = (path) => {
    setMenuOpen(false)
    setSearch('')
    if (path.includes('#')) {
      const [pathname, hash] = path.split('#')
      if (location.pathname === pathname) {
        navigate(path)
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        navigate(path)
      }
      return
    }
    transitionTo(path, 'OPENING CONTENT')
  }

  const matches = sections.filter(item =>
    `${item.label} ${item.detail} ${item.keywords}`.toLowerCase().includes(search.trim().toLowerCase())
  )

  return (
    <div className="app-shell">
      <TransitionOverlay active={transitioning} label={label} />
      <header className="topbar">
        <button className="brand-lockup button-reset" onClick={() => goTo('/home')} aria-label="ChrisWick home">
          <span className="brand-dot">CW</span><span className="brand-name">CHRISWICK</span>
        </button>
        <div className="topbar-actions">
          <nav className="desktop-nav" aria-label="Primary navigation">
            <button className="nav-link-button" onClick={() => goTo('/home#services')}>Services</button>
            <button className="nav-link-button" onClick={() => goTo('/home#work')}>Work</button>
            <button className="nav-link-button" onClick={() => goTo('/about')}>About</button>
          </nav>
          <div className="nav-discovery" ref={menuRef}>
            <button
              type="button"
              className="nav-explore"
              aria-expanded={menuOpen}
              aria-controls="chriswick-explore-menu"
              onClick={() => setMenuOpen(open => !open)}
            >
              <span aria-hidden="true">⌕</span><span>Explore / Search</span><span aria-hidden="true">{menuOpen ? '▴' : '▾'}</span>
            </button>
            {menuOpen && (
              <div className="nav-dropdown" id="chriswick-explore-menu">
                <label className="nav-search-label" htmlFor="chriswick-search">FIND A SERVICE OR PAGE</label>
                <input
                  id="chriswick-search"
                  ref={searchRef}
                  className="nav-search-input"
                  type="search"
                  placeholder="Search services, work, about…"
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                />
                <div className="nav-menu-results">
                  {matches.length ? matches.map(item => (
                    <button className="nav-result" key={item.path} onClick={() => goTo(item.path)} type="button">
                      <span><strong>{item.label}</strong><small>{item.detail}</small></span>
                      <span aria-hidden="true">↗</span>
                    </button>
                  )) : <p className="nav-no-results">No matches. Try “video,” “photo,” or “work.”</p>}
                </div>
                <p className="nav-menu-hint">Select a destination or close this menu to keep scrolling.</p>
              </div>
            )}
          </div>
          <a href={profile.booking} target="_blank" rel="noreferrer" className="nav-cta">Book</a>
        </div>
      </header>
      <Outlet context={{ transitionTo }} />
    </div>
  )
}
