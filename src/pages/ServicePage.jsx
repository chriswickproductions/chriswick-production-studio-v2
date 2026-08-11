import { useMemo } from 'react'
import { Navigate, useOutletContext, useParams } from 'react-router-dom'
import { services, profile } from '../data/site.js'
import PortfolioGrid from '../components/PortfolioGrid.jsx'

export default function ServicePage() {
  const { slug } = useParams()
  const service = useMemo(() => services.find((item) => item.slug === slug), [slug])
  const { transitionTo } = useOutletContext()
  if (!service) return <Navigate to="/home" replace />

  return (
    <main className="service-page" style={{ '--page-accent': service.accent }}>
      <section className="service-hero">
        <div className="service-image"><img src={service.hero} alt={`${service.title} work`} /></div>
        <div className="service-copy">
          <span>{service.code} // SERVICE DOSSIER</span>
          <h1>{service.title}</h1>
          <p>{service.copy}</p>
          <div className="service-hero-actions"><a href={profile.booking} target="_blank" rel="noreferrer" className="primary-button">Book {service.title}</a><button className="secondary-button button-reset" onClick={() => transitionTo('/home', 'RETURNING TO ARMORY')}>Back to armory</button></div>
        </div>
      </section>
      <section className="deliverables"><div className="section-heading"><span>SCOPE</span><h2>What this contract can include.</h2></div><div className="deliverable-grid">{service.deliverables.map((item, i) => <div key={item}><small>0{i + 1}</small><strong>{item}</strong></div>)}</div></section>
      <section className="work-section"><div className="section-heading"><span>RELATED WORK</span><h2>{service.title} portfolio.</h2></div><PortfolioGrid filter={service.slug} /></section>
      <section className="service-switcher"><span>SWITCH CONTRACT</span><div>{services.filter((item) => item.slug !== service.slug).map((item) => <button key={item.slug} onClick={() => transitionTo(`/service/${item.slug}`, `OPENING ${item.title.toUpperCase()}`)}>{item.title}<span>↗</span></button>)}</div></section>
      <section className="booking-band"><div><span>PROJECT INQUIRY</span><h2>Put this service to work.</h2><p>Booking stays one click away on every service page.</p></div><a href={profile.booking} target="_blank" rel="noreferrer" className="primary-button">Schedule on Cal.com</a></section>
    </main>
  )
}
