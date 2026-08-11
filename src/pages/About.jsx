import { profile } from '../data/site.js'

export default function About() {
  return (
    <main className="about-page">
      <section className="about-layout">
        <div className="about-portrait"><img src={profile.portrait} alt="Christopher of ChrisWick" /></div>
        <div className="about-copy"><span>PERSONNEL FILE // CW-00</span><h1>{profile.name}</h1><h2>{profile.role}</h2><p>{profile.bio}</p><div className="credential-grid"><div><small>FOCUS</small><strong>Story + Strategy</strong></div><div><small>METHOD</small><strong>Audience First</strong></div><div><small>OUTPUT</small><strong>Visual Systems</strong></div></div><div className="about-actions"><a href={profile.booking} target="_blank" rel="noreferrer" className="primary-button">Start a project</a><a href={`mailto:${profile.email}`} className="secondary-button">Email ChrisWick</a></div></div>
      </section>
    </main>
  )
}
