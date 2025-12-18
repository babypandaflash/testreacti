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
  const [sdkReady, setSdkReady] = useState(false);
  
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);

  // Initialize Privy
  useEffect(() => {
    const initPrivy = async () => {
      // Wait for SDK to load
      const maxAttempts = 50; // 5 seconds
      let attempts = 0;
      
      const checkSDK = setInterval(() => {
        attempts++;
        
        if (window.Privy) {
          clearInterval(checkSDK);
          setupPrivy();
        } else if (attempts >= maxAttempts) {
          clearInterval(checkSDK);
          console.error('❌ Privy SDK failed to load');
          setError('Authentication SDK failed to load. Please refresh the page.');
        }
      }, 100);
    };

    const setupPrivy = async () => {
      try {
        console.log('🔧 Initializing Privy...');
        
        // IMPORTANT: Replace with your actual App ID from https://dashboard.privy.io
        const appId = import.meta.env.VITE_PRIVY_APP_ID || "cmj7qvm7c015sji0cqb9bdnxx";
        
        if (appId === "YOUR_PRIVY_APP_ID") {
          console.warn('⚠️ PRIVY APP ID NOT CONFIGURED!');
          console.warn('Please get your App ID from https://dashboard.privy.io');
          console.warn('Then update it in src/EarlyAccess.jsx or add to .env.local');
          setError('⚠️ Privy App ID not configured. See console for instructions.');
        }

        // Initialize Privy client
        const client = new window.Privy({
          appId: appId,
          config: {
            loginMethods: ['email', 'wallet'],
            appearance: {
              theme: 'dark',
              accentColor: '#6cf2c2',
              logo: '/logo.png'
            },
            embeddedWallets: {
              createOnLogin: 'users-without-wallets'
            }
          }
        });

        console.log('✅ Privy initialized successfully');
        setPrivyClient(client);
        setSdkReady(true);

        // Check if user is already authenticated
        try {
          const authenticated = await client.authenticated();
          if (authenticated) {
            console.log('✅ User already authenticated');
            const userData = await client.user();
            setUser(userData);
          }
        } catch (authCheckError) {
          console.log('No existing session found');
        }

      } catch (err) {
        console.error('❌ Privy initialization error:', err);
        setError('Failed to initialize authentication system.');
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
    console.log('🔐 Login button clicked');
    
    if (!privyClient) {
      console.error('❌ Privy client not initialized');
      alert('Authentication system is not ready. Please refresh the page.');
      return;
    }

    if (!sdkReady) {
      console.error('❌ SDK not ready');
      alert('Please wait for the authentication system to load...');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🚀 Calling privy.login()...');
      
      // This will open the Privy login modal
      await privyClient.login();
      
      console.log('✅ Login modal completed');
      
      // Get user data after successful login
      const userData = await privyClient.user();
      console.log('✅ User data retrieved:', userData);
      
      setUser(userData);
      
    } catch (error) {
      console.error('❌ Login error:', error);
      
      // Check if user just closed the modal
      if (error.message && error.message.includes('User closed')) {
        console.log('ℹ️ User closed login modal');
        setError(null); // Don't show error if user just closed
      } else {
        setError('Login failed. Please try again.');
        alert('Login failed: ' + (error.message || 'Unknown error'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!privyClient) return;
    
    try {
      console.log('🚪 Logging out...');
      await privyClient.logout();
      setUser(null);
      setIsProfileOpen(false);
      console.log('✅ Logged out successfully');
    } catch (error) {
      console.error('❌ Logout failed:', error);
    }
  };

  const handleExportWallet = async () => {
    if (!privyClient) return;
    
    try {
      console.log('💾 Exporting wallet...');
      await privyClient.exportWallet();
    } catch (error) {
      console.error('❌ Export wallet failed:', error);
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
            <div style={{ 
              color: '#ff6b6b', 
              fontSize: '0.85rem', 
              marginBottom: '16px',
              padding: '12px',
              background: 'rgba(255, 107, 107, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 107, 107, 0.3)'
            }}>
              {error}
            </div>
          )}
          
          {!sdkReady && !error && (
            <div style={{ 
              color: '#6cf2c2', 
              fontSize: '0.85rem', 
              marginBottom: '16px',
              padding: '12px',
              background: 'rgba(108, 242, 194, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(108, 242, 194, 0.3)'
            }}>
              ⏳ Loading authentication system...
            </div>
          )}
          
          <button 
            className="login-btn" 
            onClick={handleLogin}
            disabled={isLoading || !privyClient || !sdkReady}
            style={{ 
              opacity: isLoading || !privyClient || !sdkReady ? 0.6 : 1,
              cursor: isLoading || !privyClient || !sdkReady ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {isLoading ? '⏳ Opening login...' : 
             !sdkReady ? '⏳ Loading...' : 
             '✉️ Continue with Email'}
          </button>
          
          <p style={{ 
            fontSize: '0.75rem', 
            color: '#9aa4bf', 
            marginTop: '12px',
            fontStyle: 'italic'
          }}>
            {sdkReady ? '🔒 Secure authentication powered by Privy' : 'Initializing...'}
          </p>
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
