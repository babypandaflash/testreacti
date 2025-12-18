import { Link } from 'react-router-dom'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'
import SocialBar from '../components/SocialBar'

export default function Home() {
  return (
    <div>
      <Topbar />

      <header>
        <h1>Web3 Social & NFT Ecosystem</h1>
        <p>
          A decentralized ecosystem combining social media, wallet, NFT marketplace,
          NFT launchpad, and token economy — built step by step with transparency.
        </p>

        <nav>
          <a href="#about">About</a>
          <a href="#features">Products</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#token">Token</a>
        </nav>

        <div className="early-access">
          <Link to="/earlyaccess">Join Early Access</Link>
          <p className="early-access-subtext">
            Get early access, exclusive NFT utilities & future rewards
          </p>
        </div>
      </header>

      <section id="about">
        <h2>Project Overview</h2>
        <div className="grid">
          <div className="card">
            <h3>Vision</h3>
            <p>
              To build a unified Web3 platform where users can socialize, manage wallets,
              trade NFTs, and participate in token-based economies without friction.
            </p>
          </div>
          <div className="card">
            <h3>Mission</h3>
            <p>
              Empower creators, communities, and collectors with secure, scalable, and
              user-friendly decentralized tools.
            </p>
          </div>
        </div>
      </section>

      <section id="features">
        <h2>Core Products</h2>
        <div className="grid">
          <div className="card">
            <h3>Web3 Social Media</h3>
            <ul>
              <li>On-chain profile identity</li>
              <li>Post, follow, and community features</li>
              <li>Creator monetization via NFTs</li>
            </ul>
          </div>

          <div className="card">
            <h3>Wallet</h3>
            <ul>
              <li>Multi-chain wallet support</li>
              <li>NFT & token management</li>
              <li>Future non-custodial integration</li>
            </ul>
          </div>

          <div className="card">
            <h3>NFT Marketplace</h3>
            <ul>
              <li>Buy & sell NFTs</li>
              <li>Creator royalties</li>
              <li>Marketplace analytics</li>
            </ul>
          </div>

          <div className="card">
            <h3>NFT Launchpad</h3>
            <ul>
              <li>Verified NFT drops</li>
              <li>Whitelist & public mint</li>
              <li>Fair launch mechanics</li>
            </ul>
          </div>

          <div className="card">
            <h3>Token Launchpad</h3>
            <ul>
              <li>Verified token launches</li>
              <li>Fair distribution mechanisms</li>
              <li>Early access for community members</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="roadmap">
        <h2>Roadmap</h2>
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

      <section id="token">
        <h2>Token Utility</h2>
        <div className="grid">
          <div className="card">
            <h3>Use Cases</h3>
            <ul>
              <li>Transaction fees</li>
              <li>NFT mint discounts</li>
              <li>Governance voting</li>
            </ul>
          </div>
          <div className="card">
            <h3>Economy</h3>
            <p>
              The token will power the ecosystem, align incentives, and reward
              long-term participation.
            </p>
          </div>
        </div>
      </section>

      <SocialBar />
      <Footer />
    </div>
  )
}
