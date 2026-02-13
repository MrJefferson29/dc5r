import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Twitter, Instagram, Youtube } from "react-bootstrap-icons";

function Footer() {
  return (
    <FooterContainer>
      <Container>
        <Row className="gy-5">
          <Col lg={4} md={12}>
            <FooterSection>
              <FooterLogo>
                DC5R<span>EXCELLENCE</span>
              </FooterLogo>
              <FooterDescription>
                Premium JDM component sourcing and technical restoration. 
                Providing the DC5 and RSX community with verified, high-performance 
                heritage parts since 2013. Engineered for those who build to inspire.
              </FooterDescription>
              <SocialIcons>
                <SocialIcon href="#" aria-label="Instagram">
                  <Instagram size={18} />
                </SocialIcon>
                <SocialIcon href="#" aria-label="Youtube">
                  <Youtube size={18} />
                </SocialIcon>
                <SocialIcon href="#" aria-label="Facebook">
                  <Facebook size={18} />
                </SocialIcon>
              </SocialIcons>
            </FooterSection>
          </Col>
          
          <Col lg={2} md={4} className="col-6">
            <FooterSection>
              <FooterTitle>Inventory</FooterTitle>
              <FooterLink href="/all-pets">All Components</FooterLink>
              <FooterLink href="/all-pets?category=interior">Interior</FooterLink>
              <FooterLink href="/all-pets?category=exterior">Exterior</FooterLink>
              <FooterLink href="/all-pets?category=performance">Performance</FooterLink>
            </FooterSection>
          </Col>

          <Col lg={2} md={4} className="col-6">
            <FooterSection>
              <FooterTitle>System</FooterTitle>
              <FooterLink href="/about">Technical Specs</FooterLink>
              <FooterLink href="/contact-us">Support Desk</FooterLink>
              <FooterLink href="/shipping">Logistics</FooterLink>
              <FooterLink href="/terms">Protocol</FooterLink>
            </FooterSection>
          </Col>
          
          <Col lg={4} md={4}>
            <FooterSection>
              <FooterTitle>HQ Terminal</FooterTitle>
              <ContactDetails>
                <p className="label">Location</p>
                <p className="value">Performance District | JDM Supply Chain</p>
                
                <p className="label">Transmission</p>
                <p className="value email">dc5rexcellence@gmail.com</p>
                
                <div className="status-tag">
                  <span className="dot" /> System Online: Global Shipping
                </div>
              </ContactDetails>
            </FooterSection>
          </Col>
        </Row>
      </Container>
      <FooterBottom>
        <div className="bottom-content">
          <p>&copy; 2026 DC5R EXCELLENCE GLOBAL. DATA ENCRYPTED.</p>
          <p className="legal-tag">Verified Components • High-Speed Logistics • Heritage First</p>
        </div>
      </FooterBottom>
    </FooterContainer>
  );
}

export default Footer;

// --- Styled Components ---

const FooterContainer = styled.footer`
  background-color: #0a0a0a; /* True Black */
  color: #ffffff;
  padding: 5rem 0 0 0;
  border-top: 4px solid #111;
`;

const FooterSection = styled.div`
  margin-bottom: 1rem;
`;

const FooterLogo = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -1px;
  margin-bottom: 1.5rem;
  color: white;

  span {
    display: block;
    font-size: 0.75rem;
    color: #cc0000; /* Championship Red */
    letter-spacing: 5px;
    font-weight: 800;
    margin-top: -5px;
  }
`;

const FooterDescription = styled.p`
  font-size: 0.85rem;
  line-height: 1.6;
  color: #888;
  max-width: 320px;
  margin-bottom: 2rem;
`;

const FooterTitle = styled.h3`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 900;
  color: #fff;
  margin-bottom: 2rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 20px;
    height: 2px;
    background: #cc0000;
  }
`;

const FooterLink = styled.a`
  display: block;
  color: #666;
  text-decoration: none;
  margin-bottom: 0.8rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  transition: all 0.2s ease;

  &:hover {
    color: #cc0000;
    padding-left: 5px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: #fff;
  background: #111;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid #222;

  &:hover {
    background-color: #cc0000;
    border-color: #cc0000;
    transform: translateY(-3px);
  }
`;

const ContactDetails = styled.div`
  .label {
    font-size: 0.65rem;
    text-transform: uppercase;
    color: #444;
    margin-bottom: 2px;
    font-weight: 800;
  }
  .value {
    font-size: 0.85rem;
    color: #aaa;
    margin-bottom: 15px;
    font-weight: 600;
  }
  .email {
    color: #fff;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-color: #cc0000;
  }
  .status-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #111;
    padding: 6px 12px;
    font-size: 0.65rem;
    font-weight: 900;
    text-transform: uppercase;
    color: #2ecc71; /* System Green */
    
    .dot {
      width: 6px;
      height: 6px;
      background: #2ecc71;
      border-radius: 50%;
      box-shadow: 0 0 8px #2ecc71;
    }
  }
`;

const FooterBottom = styled.div`
  padding: 2.5rem 1rem;
  background-color: #000;
  margin-top: 4rem;
  border-top: 1px solid #111;

  .bottom-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
  }

  p {
    margin: 0;
    font-size: 0.7rem;
    color: #444;
    font-weight: 800;
    letter-spacing: 1px;
  }

  .legal-tag {
    text-transform: uppercase;
    font-size: 0.6rem;
    letter-spacing: 2px;
    color: #222;
  }

  @media (max-width: 768px) {
    .bottom-content {
      flex-direction: column;
      text-align: center;
    }
  }
`;