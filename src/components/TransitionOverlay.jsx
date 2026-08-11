export default function TransitionOverlay({ active, label = 'AUTHORIZING' }) {
  return (
    <div className={`transition-overlay ${active ? 'is-active' : ''}`} aria-hidden="true">
      <div className="transition-copy">{label}<span> // CHRISWICK</span></div>
      <div className="vortex-core" />
      <div className="vortex-ring ring-one" />
      <div className="vortex-ring ring-two" />
      <div className="vortex-ring ring-three" />
      <div className="pixel-field" />
    </div>
  )
}
