import React, { useState, useEffect, useRef } from 'react';
import './EarlyAccess.css';

const EarlyAccess = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [privy, setPrivy] = useState(null);
  
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);

  // Initialize Privy
  useEffect(() => {
    if (window.Privy) {
      const privyInstance = new window.Privy({
        appId: "cmj7qvm7c015sji0cqb9bdnxx",
        loginMethods: ['email']
      });
      setPrivy(privyInstance);
    }
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
    if (!privy) return;
    
    try {
      const userData = await privy.login();
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleExportWallet = () => {
    if (privy) {
      privy.exportWallet();
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
          {user.email?.address?.[0]?.toUpperCase() || 'U'}
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
          <button className="login-btn" onClick={handleLogin}>
            Continue with Email
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
            <p>
              <strong>Email</strong>
              <br />
              <span>{user.email?.address || 'N/A'}</span>
            </p>
            <p>
              <strong>Wallet Address</strong>
              <br />
              <span>{user.wallet?.address || 'N/A'}</span>
            </p>
            <button onClick={handleExportWallet}>Export Wallet</button>
            <br />
            <button onClick={() => setIsProfileOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarlyAccess;
