import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import Navbar from './Navbar';
import { AuthContext } from "../../Context/AuthContext";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const { activeUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <HeaderStyles>
      <div className="nav-container">
        {/* Logo Section - Industrial Alignment */}
        <Link to='/' className="brand-block">
          <img src={logo} alt="Equine Excellence" className="brand-logo" />
        
        </Link>

        {/* Desktop Navigation - Monospace & Bold */}
        {!isMobile && (
          <div className="desktop-links">
            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            <Link className={`nav-link ${location.pathname === '/all-pets' ? 'active' : ''}`} to="/all-pets">Inventory</Link>
            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">Specs</Link>
            <Link className={`nav-link ${location.pathname === '/contact-us' ? 'active' : ''}`} to="/contact-us">Contact</Link>
            
            {activeUser && (
              <div className="admin-actions">
                <button 
                  className="admin-btn" 
                  onClick={() => navigate("/upload-horse")}
                >
                  + Add Inventory
                </button>
                <button 
                  className="logout-btn" 
                  onClick={() => { logout(); navigate("/"); }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Toggle */}
        {isMobile && <Navbar />}
      </div>
    </HeaderStyles>
  );
}

const HeaderStyles = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: #ffffff;
  border-bottom: 3px solid #111; /* Sharp industrial border */
  height: 90px;
  display: flex;
  align-items: center;

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .brand-block {
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: 15px;
  }

  .brand-logo {
    height: 55px;
    width: auto;
    filter: grayscale(1); /* Keeps it looking technical */
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    line-height: 0.9;
  }

  .brand-name {
    font-family: 'Inter', sans-serif;
    font-size: 1.8rem;
    font-weight: 900;
    color: #111;
    letter-spacing: -1px;
    text-transform: uppercase;
  }

  .brand-sub {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #cc0000; /* Signature Red */
    font-weight: 800;
  }

  .desktop-links {
    display: flex;
    gap: 40px;
    align-items: center;

    .nav-link {
      font-size: 0.85rem;
      font-weight: 800;
      color: #666;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      transition: 0.2s;

      &:hover, &.active {
        color: #111;
        padding-bottom: 4px;
        border-bottom: 3px solid #cc0000;
      }
    }
  }

  .admin-actions {
    display: flex;
    gap: 12px;
    margin-left: 20px;
    padding-left: 20px;
    border-left: 2px solid #eee;
  }

  .admin-btn {
    background: #111;
    color: white;
    border: none;
    padding: 10px 20px;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 0.75rem;
    cursor: pointer;
    transition: 0.3s;
    &:hover { background: #cc0000; }
  }

  .logout-btn {
    background: transparent;
    border: 2px solid #111;
    color: #111;
    padding: 8px 15px;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 0.7rem;
    cursor: pointer;
    &:hover { 
      background: #111; 
      color: white; 
    }
  }

  @media (max-width: 1024px) {
    height: 75px;
    .nav-container { padding: 0 1.5rem; }
    .brand-name { font-size: 1.4rem; }
  }
`;