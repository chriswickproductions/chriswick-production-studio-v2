import { services } from '../data/site.js'

function AbstractTool({ index }) {
  return (
    <div className={`armory-object armory-object-${(index % 3) + 1}`} aria-hidden="true">
      <span className="object-rail" />
      <span className="object-body" />
      <span className="object-grip" />
      <span className="object-lens" />
    </div>
  )
}

export default function ServiceWall({ onSelect }) {
  return (
    <section className="vault-section" id="services">
      <div className="section-heading split-heading">
        <div><span>SELECT CONTRACT TYPE</span><h2>The service armory.</h2></div>
        <p>Five disciplines. One objective: make the final piece impossible to mistake for generic work.</p>
      </div>
      <div className="armory-wall" role="list">
        {services.map((service, index) => (
          <button
            key={service.slug}
            className="service-slot"
            style={{ '--service-accent': service.accent, '--slot-index': index }}
            onClick={() => onSelect(service.slug, service.title)}
            role="listitem"
          >
            <div className="wall-light" />
            <div className="slot-number">0{index + 1}</div>
            <AbstractTool index={index} />
            <div className="service-slot-copy">
              <small>{service.code} // AVAILABLE</small>
              <strong>{service.title}</strong>
              <span>{service.subtitle}</span>
              <p>{service.short}</p>
              <b>OPEN DOSSIER ↗</b>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
