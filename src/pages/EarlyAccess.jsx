import { usePrivy } from '@privy-io/react-auth'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'
import SocialBar from '../components/SocialBar'

export default function EarlyAccess() {
  const { login, authenticated, user, logout, exportWallet } = usePrivy()

  return (
    <div>
      <Topbar />

      <header style={{ marginTop: '64px' }}>
        <h1>Early Community Access</h1>
        <p>
          Join the earliest members of Ugly Cat Chain and unlock exclusive NFT
          utilities, early features, and future rewards.
        </p>
      </header>

      {!authenticated ? (
        <div className="login-card">
          <h2>Join Early Community</h2>
          <p>Sign in using your email to secure your early access spot.</p>
          <button className="login-btn" onClick={login}>
            Continue with Email
          </button>
        </div>
      ) : (
        <div className="login-card">
          <h2>Welcome!</h2>
          <p style={{ wordBreak: 'break-all' }}>
            <strong>Email:</strong> <br />
            {user?.email?.address}
          </p>
          <p style={{ wordBreak: 'break-all' }}>
            <strong>Wallet Address:</strong> <br />
            {user?.wallet?.address}
          </p>
          <button className="login-btn" onClick={exportWallet}>
            Export Wallet
          </button>
          <button className="login-btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      <SocialBar />
      <Footer />
    </div>
  )
}
