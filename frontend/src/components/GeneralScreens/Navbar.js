import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, X } from 'react-bootstrap-icons';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from 'styled-components';
import { AuthContext } from '../../Context/AuthContext';

function Navbar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { activeUser, logout } = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <NavbarContainer>
      <MenuIcon
        size={32}
        onClick={handleShow}
        aria-label="Open navigation menu"
      />
      
      <StyledOffcanvas show={show} onHide={handleClose} placement="end">
        <OffcanvasHeader>
          <CloseButton onClick={handleClose}>
            <X size={35} />
          </CloseButton>
        </OffcanvasHeader>
        
        <Offcanvas.Body>
          <NavGroup>
            <NavLabel>Navigation</NavLabel>
            <NavItem onClick={() => handleNavigate('/')}>Home</NavItem>
            <NavItem onClick={() => handleNavigate('/all-pets')}>Inventory</NavItem>
            <NavItem onClick={() => handleNavigate('/about')}>Technical Specs</NavItem>
          </NavGroup>

          <NavGroup>
            <NavLabel>Collection</NavLabel>
            <NavItem onClick={() => handleNavigate('/all-pets?category=interior')}>Interior Components</NavItem>
            <NavItem onClick={() => handleNavigate('/all-pets?category=exterior')}>Exterior Aero</NavItem>
            <NavItem onClick={() => handleNavigate('/contact-us')}>Support Desk</NavItem>
          </NavGroup>

          {activeUser && (
            <NavGroup>
              <NavLabel>System Control</NavLabel>
              <NavItem onClick={() => handleNavigate('/upload-horse')}>+ Register Component</NavItem>
              <NavItem 
                className="logout"
                onClick={() => {
                  logout();
                  handleNavigate('/');
                }}
              >
                Terminate Session
              </NavItem>
            </NavGroup>
          )}

          <NavFooter>
            <p>© 2026 DC5R Excellence</p>
            <p>JDM Heritage & Precision</p>
          </NavFooter>
        </Offcanvas.Body>
      </StyledOffcanvas>
    </NavbarContainer>
  );
}

export default Navbar;

const NavbarContainer = styled.div`
  position: absolute; /* Relative to Header */
  right: 0;
  z-index: 1100;
`;

const MenuIcon = styled(List)`
  cursor: pointer;
  color: #111;
  transition: all 0.2s ease;

  &:hover {
    color: #cc0000;
  }
`;

const StyledOffcanvas = styled(Offcanvas)`
  width: 300px !important;
  background-color: #111 !important; /* Pure Black */
  color: white !important;
  border-left: 4px solid #cc0000 !important; /* Thick Red Accent Line */
`;

const OffcanvasHeader = styled.div`
  padding: 40px 30px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #222;
`;

const BrandLogo = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -1px;
  cursor: pointer;
  color: white;
  
  span {
    color: #cc0000;
    font-weight: 800;
    display: block;
    font-size: 0.65rem;
    letter-spacing: 4px;
    margin-top: -5px;
  }
`;

const CloseButton = styled.div`
  cursor: pointer;
  color: white;
  transition: 0.2s;
  &:hover { color: #cc0000; }
`;

const NavGroup = styled.div`
  margin-bottom: 2.5rem;
  padding: 0 10px;
`;

const NavLabel = styled.span`
  display: block;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #666; /* Muted Grey */
  margin-bottom: 1rem;
  font-weight: 900;
`;

const NavItem = styled.div`
  padding: 0.7rem 0;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #222;
  color: #fff;

  &:hover {
    color: #cc0000;
    padding-left: 8px;
    border-bottom-color: #cc0000;
  }

  &.logout {
    color: #cc0000;
    font-size: 0.9rem;
    border: none;
    margin-top: 10px;
    opacity: 0.8;
    &:hover { opacity: 1; }
  }
`;

const NavFooter = styled.div`
  margin-top: 4rem;
  padding: 0 10px;
  p {
    font-size: 0.6rem;
    color: #444;
    margin: 4px 0;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
`;