import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';

export default function Ads() {
  const navigate = useNavigate();
  const [horses, setHorses] = useState([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const { data } = await axios.get('https://dc5r.onrender.com/api/horses', {
          params: { limit: 8 }, // Show more on desktop
        });
        setHorses(data);
      } catch (error) {
        setHorses([]);
      }
    };
    fetchRecommended();
  }, []);

  return (
    <Styles>
      <Container>
        <div className="section-header">
          <h3>Top Sellers</h3>
        </div>

        <Row className="gx-3 gy-5"> {/* Tight horizontal gap, larger vertical gap */}
          {horses.map((horse, index) => {
            const formattedName = horse.name.replace(/\s+/g, '-').toLowerCase();
            return (
              <Col key={index} xs={6} md={4} lg={3}> {/* 4 items per row on desktop */}
                <div className="product-card" onClick={() => navigate(`/pet/${formattedName}`)}>
                  <div className="img-box">
                    <img src={horse.images[0]} alt={horse.name} />
                  </div>
                  
                  <div className="meta">
                    <h4 className="title">{horse.name}</h4>
                    <div className="pricing">
                      <span className="current-price">{horse.price}</span>
                      <span className="sale-text">20% Off Sale</span>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* JDM Legend Banner - Middle Section of Screenshot */}
      <div className="jdm-banner">
         <div className="banner-overlay">
            <h2>A True Legend</h2>
            <p>Performance Redefined</p>
         </div>
      </div>
    </Styles>
  );
}

const Styles = styled.section`
  padding: 4rem 0;
  background: #fff;

  .section-header {
    text-align: center;
    margin-bottom: 3rem;
    h3 {
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #444;
      font-size: 2rem;
    }
  }

  .product-card {
    cursor: pointer;
    text-align: center;
    transition: 0.3s;
    
    .img-box {
      background: #f8f8f8;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      margin-bottom: 15px;
      
      img {
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
    }

    &:hover img {
      transform: scale(1.1);
    }

    .title {
      font-size: 0.95rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
      height: 40px; /* Keep titles aligned */
      overflow: hidden;
    }

    .pricing {
      .current-price {
        display: block;
        color: #cc0000;
        font-weight: 800;
        font-size: 1.1rem;
      }
      .sale-text {
        font-size: 0.75rem;
        color: #72a400; /* Green for in-stock/sale items as per mobile */
        font-weight: 700;
      }
    }
  }

  .jdm-banner {
    margin-top: 5rem;
    height: 60vh;
    background: url("https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070") center/cover;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-align: center;

    .banner-overlay {
      h2 { font-size: 4rem; font-weight: 900; text-transform: uppercase; }
      p { font-size: 1.5rem; letter-spacing: 5px; text-transform: uppercase; }
    }
  }
`;