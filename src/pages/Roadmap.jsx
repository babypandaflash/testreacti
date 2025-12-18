import Topbar from '../components/Topbar'
import Footer from '../components/Footer'
import SocialBar from '../components/SocialBar'

export default function Roadmap() {
  return (
    <div>
      <Topbar />

      <header>
        <h1>Project Roadmap</h1>
        <p>Our step-by-step journey to building the ultimate Web3 ecosystem</p>
      </header>

      <section>
        <h2>Development Timeline</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>Phase 1 – Foundation</h3>
            <ul>
              <li>Project branding & documentation</li>
              <li>Official project website launched</li>
              <li>Community building</li>
            </ul>
          </div>

          <div className="timeline-item">
            <h3>Phase 2 – Project NFT Launch</h3>
            <ul>
              <li>Official project NFT collection launch</li>
              <li>NFT utility for ecosystem access</li>
              <li>Early supporter & community rewards</li>
            </ul>
          </div>

          <div className="timeline-item">
            <h3>Phase 3 – Social Media Platform</h3>
            <ul>
              <li>User profiles & feeds</li>
              <li>Content creation tools</li>
              <li>Social interactions</li>
            </ul>
          </div>

          <div className="timeline-item">
            <h3>Phase 4 – Wallet & NFT Marketplace</h3>
            <ul>
              <li>Integrated wallet UI</li>
              <li>NFT marketplace MVP</li>
              <li>Basic analytics</li>
            </ul>
          </div>

          <div className="timeline-item">
            <h3>Phase 5 – Project Token Launch</h3>
            <ul>
              <li>Official ecosystem token launch</li>
              <li>Initial token distribution</li>
              <li>Token utility activation</li>
            </ul>
          </div>

          <div className="timeline-item">
            <h3>Phase 6 – NFT Launchpad</h3>
            <ul>
              <li>Launchpad smart contracts</li>
              <li>Creator onboarding</li>
              <li>Minting events</li>
            </ul>
          </div>

          <div className="timeline-item">
            <h3>Phase 7 – Ecosystem Expansion</h3>
            <ul>
              <li>Advanced token utilities</li>
              <li>Governance system</li>
              <li>Long-term ecosystem incentives</li>
            </ul>
          </div>
        </div>
      </section>

      <SocialBar />
      <Footer />
    </div>
  )
}
