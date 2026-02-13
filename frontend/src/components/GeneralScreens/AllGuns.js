import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FiHeart, FiSearch, FiFilter, FiActivity } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AllHorses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allHorses, setAllHorses] = useState([]);
  const [filteredHorses, setFilteredHorses] = useState([]);
  const [category, setCategory] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchHorses = async () => {
      try {
        const { data } = await axios.get('https://dc5r.onrender.com/api/horses');
        setAllHorses(data);
        const queryParams = new URLSearchParams(location.search);
        const categoryFromQuery = queryParams.get('category') || 'All';
        setCategory(categoryFromQuery);
        applyFilters(searchTerm, categoryFromQuery, data);
      } catch (error) {
        console.error("Error loading inventory", error);
      }
    };
    fetchHorses();
  }, [location.search]);

  useEffect(() => {
    applyFilters(searchTerm, category, allHorses);
  }, [searchTerm, category, allHorses]);

  const categories = ['All', ...new Set(allHorses.map(h => h.category))];

  const applyFilters = (term, selectedCategory, source) => {
    const filtered = (source || []).filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(term.toLowerCase()) || 
        (item.description || "").toLowerCase().includes(term.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredHorses(filtered);
  };

  const handleCategoryClick = (cat) => {
    navigate(`/all-pets?category=${encodeURIComponent(cat)}`);
  };

  const handleCardClick = (name) => {
    const slug = name.replace(/\s+/g, '-').toLowerCase();
    navigate(`/pet/${slug}`);
  };

  return (
    <PageWrapper>
      <header className="catalog-header">
        <span className="pre-title"><FiActivity /> System Registry // v2.0</span>
        <h1>Performance <span className="red-text">Inventory</span></h1>
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by part name, SKU or vehicle fitment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <FilterBar>
        <div className="filter-label">
          <FiFilter /> <span>Filter_By:</span>
        </div>
        <div className="category-scroll">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={category === cat ? 'active' : ''}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </FilterBar>

      <GridContainer>
        {filteredHorses.map((item, index) => (
          <PartCard key={index} onClick={() => handleCardClick(item.name)}>
            <div className="img-container">
              <img src={item.images[0]} alt={item.name} />
              <div className="category-tag">{item.category}</div>
              <button className="wishlist-btn" onClick={(e) => e.stopPropagation()}>
                <FiHeart />
              </button>
              {item.condition === "New" && <div className="condition-badge">In Stock</div>}
            </div>

            <div className="card-content">
              <div className="main-info">
                <h3>{item.name}</h3>
                <span className="price">{item.price}</span>
              </div>
              
              <div className="spec-grid">
                <div className="spec-item"><span>Status:</span> {item.condition}</div>
                <div className="spec-item"><span>Type:</span> {item.componentType || 'OEM+'}</div>
                <div className="spec-item full-width">
                  <span>Compatibility:</span> DC5 / RSX / K-Series
                </div>
              </div>

              <p className="desc">
                {item.description?.split(' ').slice(0, 12).join(' ')}...
              </p>

              <div className="card-footer">
                <span className="stock-alert">High Demand</span>
                <button className="view-btn">View Specs</button>
              </div>
            </div>
          </PartCard>
        ))}
      </GridContainer>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 100px 2rem 5rem;
  background-color: #ffffff;
  overflow-x: hidden; /* Fix for horizontal bleed */

  @media (max-width: 768px) {
    padding: 80px 1.5rem 3rem;
  }

  .catalog-header {
    text-align: left; /* Shifted to left for JDM technical look */
    margin-bottom: 4rem;

    .pre-title {
      display: flex;
      align-items: center;
      gap: 8px;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #cc0000;
      font-weight: 900;
      font-size: 0.75rem;
    }

    h1 {
      font-family: 'Inter', sans-serif;
      font-weight: 900;
      font-size: clamp(2.2rem, 8vw, 4rem);
      text-transform: uppercase;
      color: #111;
      margin: 0.5rem 0 2rem;
      letter-spacing: -2px;

      .red-text { color: #cc0000; }
    }
  }

  .search-container {
    position: relative;
    max-width: 800px;
    width: 100%;

    .search-icon {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: #111;
      font-size: 1.2rem;
      z-index: 2;
    }

    input {
      width: 100%;
      padding: 1.2rem 1.2rem 1.2rem 4rem;
      border: 3px solid #111;
      border-radius: 0;
      font-size: 0.9rem;
      font-weight: 800;
      text-transform: uppercase;
      transition: all 0.2s ease;
      background: #fdfdfd;
      box-sizing: border-box;

      &:focus {
        outline: none;
        border-color: #cc0000;
        background: #fff;
        box-shadow: 10px 10px 0px rgba(204, 0, 0, 0.05);
      }
    }
  }
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 4rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .filter-label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 900;
    text-transform: uppercase;
    color: #000;
    font-size: 0.8rem;
    white-space: nowrap;
  }

  .category-scroll {
    display: flex;
    gap: 0.8rem;
    overflow-x: auto;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar { display: none; }

    button {
      background: #111;
      color: #fff;
      border: none;
      padding: 0.6rem 1.5rem;
      text-transform: uppercase;
      font-size: 0.7rem;
      font-weight: 900;
      cursor: pointer;
      white-space: nowrap;
      transition: 0.2s;

      &.active { background: #cc0000; }
      &:hover:not(.active) { background: #333; }
    }
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 3rem 1.5rem;
  width: 100%;
`;

const PartCard = styled.div`
  background: #fff;
  border: 1px solid #eee;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;
  position: relative;
  border-bottom: 4px solid #111;

  &:hover {
    transform: translateY(-8px);
    border-bottom-color: #cc0000;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    
    img { transform: scale(1.08); }
    .view-btn { background: #cc0000; }
  }

  .img-container {
    position: relative;
    height: 280px;
    overflow: hidden;
    background: #f9f9f9;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 30px;
      transition: transform 0.6s ease;
    }

    .category-tag {
      position: absolute;
      bottom: 0;
      left: 0;
      background: #111;
      color: white;
      padding: 6px 15px;
      font-size: 0.65rem;
      font-weight: 900;
      text-transform: uppercase;
    }

    .condition-badge {
      position: absolute;
      top: 0;
      left: 0;
      background: #2ecc71;
      color: white;
      padding: 6px 15px;
      font-size: 0.65rem;
      font-weight: 900;
      text-transform: uppercase;
    }

    .wishlist-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      background: white;
      border: 1px solid #eee;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s;
      &:hover { background: #111; color: #fff; }
    }
  }

  .card-content {
    padding: 1.5rem;

    .main-info {
      margin-bottom: 1.5rem;
      h3 {
        font-family: 'Inter', sans-serif;
        font-weight: 900;
        font-size: 1.15rem;
        text-transform: uppercase;
        color: #111;
        margin-bottom: 5px;
        letter-spacing: -0.5px;
      }
      .price {
        font-weight: 900;
        color: #cc0000;
        font-size: 1.5rem;
        font-family: 'Inter', sans-serif;
      }
    }

    .spec-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #f0f0f0;

      .spec-item {
        font-size: 0.7rem;
        font-weight: 800;
        text-transform: uppercase;
        color: #888;
        span { color: #111; margin-right: 4px; }
      }
      .full-width { grid-column: span 2; }
    }

    .desc {
      font-size: 0.8rem;
      color: #666;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      height: 40px;
      overflow: hidden;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .stock-alert { 
        color: #cc0000; 
        font-weight: 900; 
        font-size: 0.65rem; 
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 6px;
        &:before { content: ''; width: 6px; height: 6px; background: #cc0000; border-radius: 50%; }
      }

      .view-btn {
        background: #111;
        color: white;
        border: none;
        padding: 12px 20px;
        font-size: 0.7rem;
        font-weight: 900;
        text-transform: uppercase;
        transition: 0.3s;
      }
    }
  }
`;