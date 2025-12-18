import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const handleComingSoon = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    setShowPopup(true)
  }

  return (
    <>
      <div className="topbar">
        <img src="/logo.png" alt="Logo" />
        <div className="title">Ugly Cat Chain</div>
        <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>

      {menuOpen && (
        <div className="hamburger-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/earlyaccess" onClick={() => setMenuOpen(false)}>
            Early Access
          </Link>
          <a href="#" onClick={handleComingSoon}>
            UglyCat App
          </a>
          <a href="#" onClick={handleComingSoon}>
            UglyCat Wallet
          </a>
          <a href="#" onClick={handleComingSoon}>
            UglyCat NFT
          </a>
          <a href="#" onClick={handleComingSoon}>
            Marketplace
          </a>
          <a href="#" onClick={handleComingSoon}>
            Tokenomics
          </a>
          <Link to="/roadmap" onClick={() => setMenuOpen(false)}>
            Roadmap
          </Link>
        </div>
      )}

      {showPopup && (
        <div className="popup" onClick={() => setShowPopup(false)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <h3>Coming Soon</h3>
            <p>This feature is under development.</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}
