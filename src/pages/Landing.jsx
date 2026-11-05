import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReticleScene from '../components/three/ReticleScene.jsx'
import TransitionOverlay from '../components/TransitionOverlay.jsx'
import { useMechanicalSound } from '../hooks/useMechanicalSound.js'
import { profile, terminalLines } from '../data/site.js'

export default function Landing() {
  const navigate = useNavigate()
  const playMechanical = useMechanicalSound()
  const [transitioning, setTransitioning] = useState(false)

  
const enter = () => {
  if (transitioning) return;

  playMechanical();
  setTransitioning(true);

  window.setTimeout(() => {
    navigate("/home");
  }, 3200);
};


  return (
    <main className="landing-screen">
      <TransitionOverlay active={transitioning} label="CONTRACT ACCEPTED" />
      <div className="terminal-grid" aria-hidden="true" />
      <div className="scan-beam" aria-hidden="true" />
      <section className="landing-contract">
        <div className="contract-header">
          <div className="contract-status"><span className="status-light" /> PRIVATE CREATIVE NETWORK</div>
          <span className="terminal-clock">SECURE NODE // CW-NC</span>
        </div>
        <div className="landing-3d"><ReticleScene /></div>
        <div className="contract-copy">
          <small>CONTRACT ID // CW-2026-001</small>
          <h1>CHRIS<span>WICK</span></h1>
          <p>Visual production and strategy for organizations, athletes, brands, and people with something worth making impossible to ignore.</p>
          <div className="contract-actions">
            <button onClick={enter} className="for-hire">FOR HIRE <span>↗</span></button>
            <span className="sound-note">AUDIO ENABLED ON INTERACTION</span>
          </div>
        </div>
        <div className="terminal-readout">
          {terminalLines.map(([key, value]) => <div key={key}><span>{key}</span><strong>{value}</strong></div>)}
          <div><span>OPERATOR</span><strong>{profile.brand.toUpperCase()}</strong></div>
        </div>
        <div className="contract-footer"><span>VISUAL INTELLIGENCE // STORY SYSTEMS</span><span>AUTHORIZATION REQUIRED</span></div>
      </section>
    </main>
  )
}
