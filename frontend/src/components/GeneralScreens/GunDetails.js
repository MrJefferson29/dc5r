import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiMail, FiHeart, FiArrowLeft, FiEdit3, FiInfo, FiCheck } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const api = axios.create({ baseURL: "https://dc5r.onrender.com/api" });

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  fade: true,
  adaptiveHeight: true 
};

export default function PartDetails() {
  const [like, setLike] = useState(false);
  const [item, setItem] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { activeUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Route param is the slug (may be encoded if it contained / or other chars)
  const { name: slugParam } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      if (!slugParam) return;
      setLoading(true);
      try {
        const { data } = await api.get(`/horses/${encodeURIComponent(slugParam)}`);
        
        if (data) {
          setItem(data);

          // Fetch related items safely using the category from the returned item
          const allRes = await api.get("/horses");
          const all = Array.isArray(allRes.data) ? allRes.data : [];
          
          const related = all.filter(
            (i) => i.category === data.category && i.slug !== data.slug
          );
          setRelatedItems(related.slice(0, 4));
        } else {
          setItem(null);
        }
      } catch (err) {
        console.error("Backend fetch error:", err);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [slugParam]);

  const handleEmailClick = () => {
    if (!item) return;
    const email = "dc5rexcellence@gmail.com";
    const subject = `Inventory Inquiry: ${item.name}`;
    const body = `Hello,\n\nI'm interested in the ${item.name} (${item.price}). \nPlease provide shipping details.`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (loading) return <LoadingState>Fetching Technical Specs...</LoadingState>;
  
  // This prevents the blank screen if data is missing
  if (!item) return (
    <NotFound>
      <FiArrowLeft /> Component Not Found. 
      <br/><br/>
      <Link to="/all-pets">Browse Inventory</Link>
    </NotFound>
  );

  return (
    <DetailsStyles>
      <div className="breadcrumb">
        <Link to="/all-pets"><FiArrowLeft /> Back to Full Catalog</Link>
      </div>

      <div className="main-layout">
        <div className="gallery-section">
          {item.images && item.images.length > 0 ? (
            <Slider {...sliderSettings}>
              {item.images.map((img, i) => (
                <div key={i} className="slide">
                  <img src={img} alt={item.name} />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="no-image">No Images Available</div>
          )}
        </div>

        <div className="content-section">
          <div className="header-flex">
            <span className="category-label">
              {item.subcategory ? `${item.category} · ${item.subcategory}` : item.category}
            </span>
            <h1 className="item-name">{item.name}</h1>
            <div className="price-tag">{item.price}</div>
          </div>

          <div className="stock-indicator">
            <FiCheck /> Verified Authentic JDM Component
          </div>

          <p className="description">{item.description || "No technical description provided for this record."}</p>

          <div className="specs-table">
            <div className="row">
              <span className="label">Category</span>
              <span className="value">{item.category}</span>
            </div>
            {item.subcategory && (
              <div className="row">
                <span className="label">Subcategory</span>
                <span className="value">{item.subcategory}</span>
              </div>
            )}
            <div className="row">
              <span className="label">Condition</span>
              <span className="value">{item.condition}</span>
            </div>
            <div className="row">
              <span className="label">Fitment</span>
              <span className="value">
                {Array.isArray(item.fits) && item.fits.length > 0
                  ? item.fits.join(" · ")
                  : "—"}
              </span>
            </div>
          </div>

          {item.fits && item.fits.length > 0 && (
            <div className="fitment-box">
              <h3><FiInfo /> Verified Chassis Compatibility</h3>
              <div className="fitment-tags">
                {item.fits.map((fit, idx) => <span key={idx} className="tag">{fit}</span>)}
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button className="msg-btn" onClick={handleEmailClick}><FiMail /> Request Quote</button>
            <button className={`like-btn ${like ? 'active' : ''}`} onClick={() => setLike(!like)}>
              <FiHeart fill={like ? "#cc0000" : "none"} />
            </button>
          </div>

          {activeUser && (
            <button className="admin-edit-btn" onClick={() => navigate(`/pet/${encodeURIComponent(slugParam)}/edit`)}>
              <FiEdit3 /> Edit Technical Record
            </button>
          )}
        </div>
      </div>

      {relatedItems.length > 0 && (
        <RelatedSection>
          <h3>Complementary Parts</h3>
          <div className="related-grid">
            {relatedItems.map((ri, i) => (
              <Link key={i} to={`/pet/${encodeURIComponent(ri.slug)}`} className="related-card">
                <img src={ri.images?.[0]} alt={ri.name} />
                <div className="related-info">
                  <h4>{ri.name}</h4>
                  <span className="price">{ri.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </RelatedSection>
      )}
    </DetailsStyles>
  );
}

const DetailsStyles = styled.div`
  max-width: 1300px;
  margin: 8rem auto 4rem;
  padding: 0 2rem;
  box-sizing: border-box;

  .breadcrumb {
    margin-bottom: 2rem;
    a { color: #666; text-decoration: none; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; display: flex; align-items: center; gap: 8px; &:hover { color: #cc0000; } }
  }

  .main-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
    width: 100%;
  }

  .gallery-section {
    background: #fff;
    border: 1px solid #eee;
    overflow: hidden; /* Critical for slider overflow */
    
    img {
      width: 100%;
      height: auto;
      max-height: 550px;
      object-fit: contain;
      padding: 20px;
      display: block;
      margin: 0 auto;
    }
  }

  .content-section {
    min-width: 0; /* Prevents flex/grid children from overflowing */
    .category-label { color: #cc0000; font-weight: 900; font-size: 0.8rem; text-transform: uppercase; }
    .item-name { font-weight: 900; font-size: 2.5rem; color: #111; margin: 0.5rem 0; text-transform: uppercase; line-height: 1.1; word-wrap: break-word; }
    .price-tag { font-size: 2rem; font-weight: 900; color: #cc0000; margin-bottom: 1.5rem; }
    .stock-indicator { display: flex; align-items: center; gap: 5px; color: #2ecc71; font-weight: 800; font-size: 0.7rem; text-transform: uppercase; margin-bottom: 1.5rem; }
    .description { font-size: 1rem; line-height: 1.6; color: #444; margin-bottom: 2rem; }

    .specs-table {
      margin-bottom: 2rem;
      border-top: 1px solid #eee;
      .row {
        display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; font-size: 0.9rem;
        .label { font-weight: 800; text-transform: uppercase; color: #888; }
        .value { font-weight: 700; color: #111; }
      }
    }

    .fitment-box {
      background: #111; padding: 1.2rem; margin-bottom: 2rem;
      h3 { color: white; font-size: 0.7rem; margin: 0 0 1rem 0; text-transform: uppercase; display: flex; align-items: center; gap: 8px; svg { color: #cc0000; } }
      .fitment-tags { display: flex; flex-wrap: wrap; gap: 6px; .tag { background: #333; color: #eee; padding: 4px 10px; font-size: 0.7rem; font-weight: 600; } }
    }

    .action-buttons { display: flex; gap: 1rem; }
    .msg-btn { flex: 1; background: #111; color: white; border: none; padding: 1rem; font-weight: 900; text-transform: uppercase; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.3s; &:hover { background: #cc0000; } }
    .like-btn { width: 60px; background: white; border: 2px solid #111; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; cursor: pointer; &.active { border-color: #cc0000; color: #cc0000; } }
    .admin-edit-btn { margin-top: 1rem; width: 100%; background: #f4f4f4; border: none; padding: 8px; font-weight: 800; text-transform: uppercase; font-size: 0.7rem; cursor: pointer; }
  }

  @media (max-width: 992px) {
    .main-layout { grid-template-columns: 1fr; gap: 2rem; }
    .item-name { font-size: 2rem; }
  }
`;

const RelatedSection = styled.div`
  margin-top: 6rem; padding-top: 3rem; border-top: 2px solid #111;
  h3 { font-weight: 900; text-transform: uppercase; font-size: 1.3rem; margin-bottom: 2rem; }
  .related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; }
  .related-card {
    text-decoration: none; border: 1px solid #eee; transition: 0.3s;
    &:hover { border-color: #cc0000; transform: translateY(-5px); }
    img { width: 100%; height: 200px; object-fit: contain; padding: 15px; background: #fafafa; box-sizing: border-box; }
    .related-info { padding: 1rem; h4 { color: #111; margin: 0 0 5px 0; font-size: 0.85rem; font-weight: 900; text-transform: uppercase; } .price { color: #cc0000; font-weight: 800; } }
  }
`;

const LoadingState = styled.div` height: 100vh; display: flex; align-items: center; justify-content: center; font-weight: 900; text-transform: uppercase; color: #cc0000; letter-spacing: 2px; `;
const NotFound = styled.div` padding: 15rem 2rem; text-align: center; font-weight: 900; text-transform: uppercase; line-height: 1.5; a { color: #cc0000; text-decoration: underline; } `;