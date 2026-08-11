import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { profile } from '../data/site.js'
import TransitionOverlay from './TransitionOverlay.jsx'
import { useMechanicalSound } from '../hooks/useMechanicalSound.js'

export default function Shell() {
  const navigate = useNavigate()
  const location = useLocation()
  const playMechanical = useMechanicalSound()
  const [transitioning, setTransitioning] = useState(false)
  const [label, setLabel] = useState('ACCESSING')

  const transitionTo = (path, nextLabel = 'ACCESSING') => {
    if (location.pathname === path) return
    playMechanical()
    setLabel(nextLabel)
    setTransitioning(true)
    window.setTimeout(() => {
      navigate(path)
      window.scrollTo({ top: 0, behavior: 'auto' })
      window.setTimeout(() => setTransitioning(false), 180)
    }, 720)
  }

  return (
    <div className="app-shell">
      <TransitionOverlay active={transitioning} label={label} />
      <header className="topbar">
        <button className="brand-lockup button-reset" onClick={() => transitionTo('/home', 'RETURNING')}><span className="brand-dot">CW</span><span>CHRISWICK</span></button>
        <nav aria-label="Primary navigation">
          <button className="nav-link-button" onClick={() => { if (location.pathname !== '/home') transitionTo('/home', 'OPENING SERVICES'); else document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}>Services</button>
          <button className="nav-link-button" onClick={() => transitionTo('/about', 'OPENING PERSONNEL FILE')}>About</button>
          <a href={profile.booking} target="_blank" rel="noreferrer" className="nav-cta">Book</a>
        </nav>
      </header>
      <Outlet context={{ transitionTo }} />
    </div>
  )
}
