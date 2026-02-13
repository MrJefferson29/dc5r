import React from "react";
import styled from "styled-components";
import heroImg from "../../Assets/nas1.jpg"; 
import { useNavigate } from "react-router-dom";
import Ads from "./Ads";
import Sc2 from "./Sc2";

export default function Sc1() {
  const navigate = useNavigate();

  return (
    <Styles>
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="text-wrapper">
            <span className="est-tag">EST. 2013 // JDM SPEC</span>
            <h1 className="hero-title">
              Built To <br />
              <span className="red">Inspire</span>
            </h1>
            <p className="hero-subtitle">
              Precision Engineering. Performance Excellence.
            </p>
            
            <div className="button-group">
              <button className="cta-primary" onClick={() => navigate("/all-pets")}>
                Browse Inventory
              </button>
              <button className="cta-outline" onClick={() => navigate("/about")}>
                Our Story
              </button>
            </div>
          </div>
        </div>
        
        <div className="indicators">
          <span className="dot active" />
          <span className="dot" />
          <span className="dot" />
        </div>

        {/* Decorative elements for that technical look */}
        <div className="corner-accent" />
      </section>
      <Ads />
      <Sc2 />
    </Styles>
  );
}

const Styles = styled.div`
  .hero-section {
    height: 100vh;
    background: url(${heroImg});
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      70deg, 
      rgba(0,0,0,0.9) 0%, 
      rgba(0,0,0,0.4) 40%, 
      transparent 100%
    );
    z-index: 1;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 5%;
  }

  .text-wrapper {
    max-width: 800px;
    text-align: left; /* Aligned left for a more aggressive feel */
  }

  .est-tag {
    display: inline-block;
    font-size: 0.9rem;
    font-weight: 900;
    letter-spacing: 4px;
    margin-bottom: 1rem;
    color: #cc0000;
    border-left: 3px solid #cc0000;
    padding-left: 10px;
  }

  .hero-title {
    font-family: 'Inter', sans-serif;
    font-size: clamp(3.5rem, 12vw, 8rem); /* Larger, more impactful font */
    font-weight: 900;
    text-transform: uppercase;
    line-height: 0.85;
    margin-bottom: 1.5rem;
    letter-spacing: -2px;
    color: #fff;

    .red {
      color: #cc0000;
      -webkit-text-stroke: 1px #cc0000; /* Subtle sharpen effect */
    }
  }

  .hero-subtitle {
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 3rem;
    color: #ccc;
    font-weight: 600;
    max-width: 500px;
  }

  .button-group {
    display: flex;
    gap: 1rem;
  }

  .cta-primary, .cta-outline {
    padding: 1.2rem 2.5rem;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    position: relative;
    overflow: hidden;
  }

  .cta-primary {
    background: #cc0000;
    color: white;
    border: none;
    &:hover { 
      background: #fff; 
      color: #000;
      transform: translateY(-3px);
    }
  }

  .cta-outline {
    background: transparent;
    color: white;
    border: 2px solid rgba(255,255,255,0.3);
    &:hover { 
      border-color: #fff;
      background: rgba(255,255,255,0.1);
      transform: translateY(-3px);
    }
  }

  .indicators {
    position: absolute;
    bottom: 40px;
    right: 5%;
    display: flex;
    flex-direction: column; /* Vertical indicators for a technical feel */
    gap: 15px;
    z-index: 2;

    .dot {
      width: 4px;
      height: 20px;
      background: rgba(255,255,255,0.2);
      transition: 0.3s;
      &.active { background: #cc0000; height: 40px; }
    }
  }

  .corner-accent {
    position: absolute;
    bottom: -50px;
    left: -50px;
    width: 200px;
    height: 200px;
    border: 1px solid rgba(204, 0, 0, 0.2);
    transform: rotate(45deg);
  }

  /* --- RESPONSIVENESS --- */
  @media (max-width: 768px) {
    .hero-section {
      align-items: flex-end; /* Text sits at bottom on mobile */
      padding-bottom: 100px;
    }

    .hero-overlay {
      background: linear-gradient(
        to top,
        rgba(0,0,0,0.95) 0%,
        rgba(0,0,0,0.5) 50%,
        rgba(0,0,0,0.2) 100%
      );
    }

    .text-wrapper {
      text-align: left;
    }

    .button-group {
      flex-direction: column; /* Stack buttons on mobile */
      width: 100%;
    }

    .cta-primary, .cta-outline {
      width: 100%;
      text-align: center;
      padding: 1.1rem;
    }

    .indicators {
      right: 20px;
      bottom: 20px;
    }
  }
`;