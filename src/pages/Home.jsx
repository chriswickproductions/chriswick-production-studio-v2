import { Link, useOutletContext } from 'react-router-dom'
import ServiceWall from '../components/ServiceWall.jsx'
import PortfolioGrid from '../components/PortfolioGrid.jsx'
import { profile } from '../data/site.js'

export default function Home() {
  const { transitionTo } = useOutletContext()
  return (
    <main>
      <section className="home-hero">
        <div className="hero-scanlines" />
        <div className="hero-red-glow" />
        <div className="home-hero-copy">
          <span className="eyebrow">CREATIVE CONTRACTOR // VISUAL STRATEGY</span>
          <h1>Make the audience <em>feel</em> the point.</h1>
          <p>ChrisWick combines production craft with strategy so the finished work does more than look expensive—it moves attention, understanding, and action.</p>
          <div className="hero-actions"><a href="#services" className="primary-button">Choose a service</a><button className="secondary-button button-reset" onClick={() => transitionTo('/about', 'OPENING PERSONNEL FILE')}>About Christopher</button></div>
        </div>
        <aside className="home-hero-panel" aria-label="Availability summary">
          <span>ACTIVE DISCIPLINES</span><strong>05</strong><small>PHOTO · VIDEO · SOCIAL · DESIGN · CONSULT</small>
          <div className="panel-divider" /><span>STATUS</span><b>{profile.availability}</b>
        </aside>
      </section>
      <ServiceWall onSelect={(slug, title) => transitionTo(`/service/${slug}`, `OPENING ${title.toUpperCase()}`)} />
      <section className="work-section">
        <div className="section-heading split-heading"><div><span>SELECTED OPERATIONS</span><h2>Work with a measurable pulse.</h2></div><p>Real portfolio pieces from education, athletics, interviews, campaigns, and social content.</p></div>
        <PortfolioGrid />
      </section>
      <section className="booking-band"><div><span>READY WHEN THE IDEA IS</span><h2>Bring the vision into focus.</h2><p>Choose a discipline or start with consultation if the brief still needs sharpening.</p></div><a href={profile.booking} target="_blank" rel="noreferrer" className="primary-button">Book a consultation</a></section>
    </main>
  )
}
