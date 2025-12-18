import React, { useState, useEffect, useRef } from 'react';
import './EarlyAccess.css';

const EarlyAccess = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [privyClient, setPrivyClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);

  // Initialize Privy
  useEffect(() => {
    const initPrivy = async () => {
      try {
        // Wait for Privy to load
        if (typeof window.Privy === 'undefined') {
          console.error('Privy SDK not loaded');
          setError('Privy SDK not loaded. Please refresh the page.');
          return;
        }

        // IMPORTANT: Ganti dengan App ID Anda yang sebenarnya dari https://dashboard.privy.io
        const appId = "cmj7qvm7c015sji0cqb9bdnxx";
        
        if (appId === "YOUR_PRIVY_APP_ID") {
          console.warn('⚠️ Please replace YOUR_PRIVY_APP_ID with your actual Privy App ID');
          setError('Please configure your Privy App ID in the code.');
        }

        const client = new window.Privy({
          appId: appId,
          config: {
            loginMethods: ['email', 'wallet'],
            appearance: {
              theme: 'dark',
              accentColor: '#6cf2c2'
            }
          }
        });

        setPrivyClient(client);

        // Check if user is already logged in
        const isAuthenticated = await client.authenticated();
        if (isAuthenticated) {
          const userData = await client.user();
          setUser(userData);
        }
      } catch (err) {
        console.error('Privy initialization error:', err);
        setError('Failed to initialize authentication. Please refresh the page.');
      }
    };

    initPrivy();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(e.target) && 
        menuBtnRef.current && 
        !menuBtnRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogin = async () => {
    if (!privyClient) {
      alert('Authentication system is not ready. Please refresh the page.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await privyClient.login();
      
      // Get user data after successful login
      const userData = await privyClient.user();
      setUser(userData);
      console.log('Login successful:', userData);
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
      alert('Login failed. Please try again or check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!privyClient) return;
    
    try {
      await privyClient.logout();
      setUser(null);
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleExportWallet = async () => {
    if (!privyClient) return;
    
    try {
      await privyClient.exportWallet();
    } catch (error) {
      console.error('Export wallet failed:', error);
      alert('Failed to export wallet. Please try again.');
    }
  };

  const handleComingSoonClick = (e) => {
    e.preventDefault();
    setIsComingSoonOpen(true);
    setIsMenuOpen(false);
  };

  const socialLinks = [
    { icon: 'fa-x-twitter', url: '#' },
    { icon: 'fa-discord', url: '#' },
    { icon: 'fa-instagram', url: '#' },
    { icon: 'fa-telegram', url: '#' },
    { icon: 'fa-youtube', url: '#' }
  ];

  return (
    <div className="early-access-page">
      {/* Top Bar */}
      <div className="topbar">
        <img src="/logo.png" alt="Ugly Cat Chain Logo" />
        <div className="title">Ugly Cat Chain</div>
        <div 
          className="menu-btn" 
          ref={menuBtnRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </div>
      </div>

      {/* Profile Avatar */}
      {user && (
        <div 
          className="profile-avatar" 
          onClick={() => setIsProfileOpen(true)}
        >
          {user.email?.address?.[0]?.toUpperCase() || 
           user.wallet?.address?.substring(0, 2) || 
           'U'}
        </div>
      )}

      {/* Hamburger Menu */}
      <div 
        className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
        ref={menuRef}
        style={{ display: isMenuOpen ? 'flex' : 'none' }}
      >
        <a href="index.html">Home</a>
        <a href="earlyaccess.html">Early Access</a>
        <a href="#" className="coming-soon" onClick={handleComingSoonClick}>
          UglyCat App
        </a>
        <a href="#" className="coming-soon" onClick={handleComingSoonClick}>
          UglyCat Wallet
        </a>
        <a href="#" className="coming-soon" onClick={handleComingSoonClick}>
          UglyCat NFT
        </a>
        <a href="#" className="coming-soon" onClick={handleComingSoonClick}>
          Marketplace
        </a>
        <a href="#" className="coming-soon" onClick={handleComingSoonClick}>
          Tokenomics
        </a>
        <a href="roadmap.html">Roadmap</a>
      </div>

      {/* Header */}
      <header>
        <h1>Early Community Access</h1>
        <p>
          Join the earliest members of Ugly Cat Chain and unlock exclusive NFT 
          utilities, early features, and future rewards.
        </p>
      </header>

      {/* Login Card */}
      {!user && (
        <div className="login-card">
          <h2>Join Early Community</h2>
          <p>Sign in using your email to secure your early access spot.</p>
          {error && (
            <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginBottom: '12px' }}>
              {error}
            </p>
          )}
          <button 
            className="login-btn" 
            onClick={handleLogin}
            disabled={isLoading || !privyClient}
            style={{ 
              opacity: isLoading || !privyClient ? 0.6 : 1,
              cursor: isLoading || !privyClient ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Loading...' : 'Continue with Email'}
          </button>
        </div>
      )}

      {/* Social Bar */}
      <div className="social-bar">
        {socialLinks.map((social, index) => (
          <a key={index} href={social.url}>
            <i className={`fa-brands ${social.icon}`}></i>
          </a>
        ))}
      </div>

      {/* Footer */}
      <footer>© 2025 Ugly Cat Chain. All rights reserved.</footer>

      {/* Coming Soon Popup */}
      {isComingSoonOpen && (
        <div className="popup" onClick={() => setIsComingSoonOpen(false)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <h3>Coming Soon</h3>
            <p>This feature is under development.</p>
            <button onClick={() => setIsComingSoonOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Profile Popup */}
      {isProfileOpen && user && (
        <div className="popup" onClick={() => setIsProfileOpen(false)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <h3>Your Profile</h3>
            {user.email && (
              <p>
                <strong>Email</strong>
                <br />
                <span>{user.email.address}</span>
              </p>
            )}
            {user.wallet && (
              <p>
                <strong>Wallet Address</strong>
                <br />
                <span style={{ fontSize: '0.75rem' }}>
                  {user.wallet.address}
                </span>
              </p>
            )}
            {!user.email && !user.wallet && (
              <p style={{ color: '#9aa4bf' }}>No account information available</p>
            )}
            {user.wallet && (
              <>
                <button onClick={handleExportWallet}>Export Wallet</button>
                <br />
              </>
            )}
            <button onClick={handleLogout} style={{ background: '#ff6b6b' }}>
              Logout
            </button>
            <br />
            <button onClick={() => setIsProfileOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarlyAccess;
