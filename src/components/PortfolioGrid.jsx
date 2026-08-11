import { portfolio } from '../data/site.js'

export default function PortfolioGrid({ filter }) {
  const items = filter ? portfolio.filter((item) => item.category === filter) : portfolio
  if (!items.length) return <p className="empty-state">Selected work for this discipline is being prepared.</p>
  return (
    <div className="portfolio-grid">
      {items.map((item, index) => (
        <article className="project-card" key={item.id} style={{ '--project-index': index }}>
          <div className="project-image-wrap"><img src={item.image} alt={item.title} loading="lazy" /></div>
          <div className="project-meta"><span>{item.metric}</span><h3>{item.title}</h3><small>CASE FILE // {String(item.id).padStart(2, '0')}</small></div>
        </article>
      ))}
    </div>
  )
}
