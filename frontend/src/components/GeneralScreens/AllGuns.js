import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { FiHeart, FiSearch, FiFilter, FiActivity, FiChevronRight, FiCpu, FiShield } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  INVENTORY_MAIN_CATEGORIES,
  SUBCATEGORIES_BY_MAIN,
  hasSubcategories,
} from '../../constants/inventoryCategories';

// Keyframes for subtle entrance
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scanline = keyframes`
  0% { bottom: 100%; }
  100% { bottom: 0%; }
`;

export default function AllHorses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allHorses, setAllHorses] = useState([]);
  const [filteredHorses, setFilteredHorses] = useState([]);
  const [category, setCategory] = useState('All');
  const [subcategory, setSubcategory] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchHorses = async () => {
      try {
        const { data } = await axios.get('https://dc5r.onrender.com/api/horses');
        setAllHorses(data);
        const queryParams = new URLSearchParams(location.search);
        const catFromQuery = queryParams.get('category') || 'All';
        const subFromQuery = queryParams.get('subcategory') || 'All';
        setCategory(catFromQuery);
        setSubcategory(subFromQuery);
        applyFilters(searchTerm, catFromQuery, subFromQuery, data);
      } catch (error) {
        console.error("Error loading inventory", error);
      }
    };
    fetchHorses();
  }, [location.search]);

  useEffect(() => {
    applyFilters(searchTerm, category, subcategory, allHorses);
  }, [searchTerm, category, subcategory, allHorses]);

  const subcategoryOptions = category && category !== 'All' && hasSubcategories(category)
    ? SUBCATEGORIES_BY_MAIN[category]
    : [];

  const applyFilters = (term, selectedCategory, selectedSubcategory, source) => {
    const filtered = (source || []).filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(term.toLowerCase()) ||
        (item.description || "").toLowerCase().includes(term.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSubcategory =
        selectedSubcategory === 'All' || !selectedSubcategory || item.subcategory === selectedSubcategory;
      return matchesSearch && matchesCategory && matchesSubcategory;
    });
    setFilteredHorses(filtered);
  };

  const handleCategoryClick = (cat) => {
    const params = new URLSearchParams();
    if (cat !== 'All') params.set('category', cat);
    navigate(`/all-pets${params.toString() ? `?${params.toString()}` : ''}`);
    setSubcategory('All');
  };

  const handleSubcategoryClick = (sub) => {
    const params = new URLSearchParams(location.search);
    if (category !== 'All') params.set('category', category);
    if (sub !== 'All') params.set('subcategory', sub);
    navigate(`/all-pets?${params.toString()}`);
  };

  const handleCardClick = (item) => {
    const slug = item.slug || item.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/pet/${encodeURIComponent(slug)}`);
  };

  return (
    <PageWrapper>
      <div className="grid-overlay" />
      
      <header className="catalog-header">
        <div className="status-bar">
          <span className="pre-title"><FiActivity /> System Registry // v2.0.4</span>
          <span className="uptime"><FiShield /> Secure Connection Established</span>
        </div>
        <h1>Performance <span className="red-text">Inventory</span></h1>
        
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by part name, SKU or vehicle fitment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="input-accent" />
        </div>
      </header>

      <ContentLayout>
        <Sidebar>
          <div className="sidebar-inner">
            <h4 className="section-title"><FiCpu /> Hardware Nodes</h4>
            <div className="filter-list">
              <button
                className={category === 'All' ? 'active main-btn' : 'main-btn'}
                onClick={() => handleCategoryClick('All')}
              >
                All Inventory
              </button>
              {INVENTORY_MAIN_CATEGORIES.map((cat) => (
                <div key={cat} className="category-group">
                  <button
                    className={category === cat ? 'active main-btn' : 'main-btn'}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat}
                    {category === cat && <FiChevronRight className="chevron-icon" />}
                  </button>
                  
                  {category === cat && subcategoryOptions.length > 0 && (
                    <div className="subcategory-list">
                      <button 
                        className={subcategory === 'All' ? 'sub-active' : ''}
                        onClick={() => handleSubcategoryClick('All')}
                      >
                        :: All_{cat}
                      </button>
                      {subcategoryOptions.map(sub => (
                        <button 
                          key={sub}
                          className={subcategory === sub ? 'sub-active' : ''}
                          onClick={() => handleSubcategoryClick(sub)}
                        >
                          :: {sub.replace(/\s+/g, '_')}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Sidebar>

        <MainGrid>
          <div className="results-header">
            <div className="results-meta">
              Query returned <strong>{filteredHorses.length}</strong> active units
            </div>
            <div className="view-options">
               <span>Sort: Default</span>
            </div>
          </div>

          <GridContainer>
            {filteredHorses.map((item, index) => (
              <PartCard key={index} onClick={() => handleCardClick(item)} style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="img-container">
                  <div className="scan-line" />
                  <img src={item.images[0]} alt={item.name} />
                  <div className="category-tag">
                    {item.subcategory ? `${item.category} // ${item.subcategory}` : item.category}
                  </div>
                  <button className="wishlist-btn" onClick={(e) => e.stopPropagation()}>
                    <FiHeart />
                  </button>
                  {item.condition === "New" && <div className="condition-badge">Factory Fresh</div>}
                </div>

                <div className="card-content">
                  <div className="main-info">
                    <h3>{item.name}</h3>
                    <span className="price">{item.price}</span>
                  </div>
                  
                  <div className="spec-grid">
                    <div className="spec-item"><span>State:</span> {item.condition}</div>
                    <div className="spec-item"><span>ID:</span> #{Math.random().toString(36).substr(2, 5).toUpperCase()}</div>
                  </div>

                  <div className="card-footer">
                    <span className="stock-alert">Available for Dispatch</span>
                    <button className="view-btn">Initialize Specs</button>
                  </div>
                </div>
              </PartCard>
            ))}
          </GridContainer>
        </MainGrid>
      </ContentLayout>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 120px 2rem 5rem;
  background-color: #ffffff;
  position: relative;
  min-height: 100vh;

  .grid-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; height: 600px;
    background-image: linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 0;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));
    pointer-events: none;
  }

  .catalog-header {
    position: relative;
    z-index: 1;
    margin-bottom: 4rem;

    .status-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.5rem;
    }

    .pre-title, .uptime {
      display: flex;
      align-items: center;
      gap: 8px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #cc0000;
      font-weight: 900;
      font-size: 0.65rem;
    }

    .uptime { color: #888; }

    h1 {
      font-family: 'Inter', sans-serif;
      font-weight: 900;
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      text-transform: uppercase;
      color: #111;
      margin: 0;
      letter-spacing: -3px;
      line-height: 0.9;
      .red-text { color: #cc0000; }
    }
  }

  .search-container {
    position: relative;
    max-width: 700px;
    margin-top: 2rem;
    
    .search-icon {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: #111;
      z-index: 2;
    }
    
    input {
      width: 100%;
      padding: 1.2rem 1.2rem 1.2rem 4rem;
      border: 3px solid #111;
      background: #fff;
      font-weight: 800;
      text-transform: uppercase;
      font-size: 0.9rem;
      position: relative;
      z-index: 1;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        box-shadow: 10px 10px 0px rgba(204, 0, 0, 0.1);
        transform: translate(-4px, -4px);
      }
    }
  }
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 4rem;
  position: relative;
  z-index: 1;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 40px;
  height: fit-content;

  .sidebar-inner {
    border-right: 1px solid #eee;
    padding-right: 2rem;
  }

  .section-title {
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 2px;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #111;
    background: #f8f8f8;
    padding: 10px;
    border-left: 5px solid #cc0000;
  }

  .filter-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .main-btn {
      background: none;
      border: none;
      text-align: left;
      padding: 12px 15px;
      font-size: 0.85rem;
      font-weight: 800;
      text-transform: uppercase;
      color: #777;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.2s;
      border-radius: 4px;

      &:hover { 
        color: #111; 
        background: #f5f5f5;
        padding-left: 20px;
      }
      &.active { 
        color: #fff; 
        background: #111;
      }
    }

    .subcategory-list {
      display: flex;
      flex-direction: column;
      padding: 0.5rem 0 1rem 1rem;
      border-left: 1px dashed #ddd;
      margin-left: 15px;
      
      button {
        background: none; border: none; text-align: left;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 6px 0;
        color: #999;
        cursor: pointer;
        transition: 0.2s;
        &:hover { color: #cc0000; transform: translateX(5px); }
        &.sub-active { color: #111; font-weight: 900; }
      }
    }
  }
`;

const MainGrid = styled.div`
  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f0f0f0;
  }

  .results-meta {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: #888;
    font-weight: 700;
    strong { color: #cc0000; font-size: 1rem; }
  }

  .view-options span {
    font-size: 0.7rem;
    font-weight: 900;
    text-transform: uppercase;
    background: #eee;
    padding: 5px 10px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`;

const PartCard = styled.div`
  background: #fff;
  border: 1px solid #e0e0e0;
  position: relative;
  animation: ${fadeInUp} 0.5s ease backwards;
  
  &:hover {
    box-shadow: 20px 20px 0px rgba(0,0,0,0.05);
    border-color: #111;
    .img-container img { transform: scale(1.05); }
    .scan-line { display: block; }
  }

  .img-container {
    position: relative;
    height: 280px;
    background: #fcfcfc;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    .scan-line {
      display: none;
      position: absolute;
      width: 100%;
      height: 2px;
      background: rgba(204, 0, 0, 0.2);
      z-index: 2;
      animation: ${scanline} 2s linear infinite;
    }

    img { 
      width: 80%; height: 80%; object-fit: contain; 
      transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    .category-tag {
      position: absolute;
      top: 0; right: 0;
      background: #111; color: white;
      padding: 6px 12px; font-size: 0.6rem; font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .wishlist-btn {
      position: absolute;
      bottom: 15px; right: 15px;
      background: white; border: 1px solid #eee;
      width: 35px; height: 35px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: 0.2s;
      &:hover { background: #cc0000; color: white; border-color: #cc0000; }
    }

    .condition-badge {
      position: absolute;
      bottom: 15px; left: 15px;
      background: #cc0000; color: white;
      padding: 4px 8px; font-size: 0.6rem; font-weight: 900;
      text-transform: uppercase;
    }
  }

  .card-content {
    padding: 1.8rem;
    
    .main-info {
      margin-bottom: 1.5rem;
      h3 { font-size: 1.1rem; font-weight: 900; text-transform: uppercase; color: #111; margin: 0 0 8px; line-height: 1.2; height: 2.4em; overflow: hidden; }
      .price { font-weight: 900; color: #cc0000; font-size: 1.5rem; letter-spacing: -1px; }
    }

    .spec-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 2rem;
      padding: 15px 0;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;

      .spec-item { 
        font-size: 0.65rem; font-weight: 800; color: #888; text-transform: uppercase; 
        span { color: #111; display: block; margin-bottom: 2px; font-size: 0.55rem; opacity: 0.6; } 
      }
    }

    .card-footer {
      display: flex; justify-content: space-between; align-items: center;
      .stock-alert { font-weight: 900; font-size: 0.6rem; text-transform: uppercase; color: #aaa; }
      .view-btn { 
        background: #111; color: white; border: none; padding: 10px 18px; 
        font-size: 0.7rem; font-weight: 900; text-transform: uppercase; 
        cursor: pointer; transition: 0.2s;
        &:hover { background: #cc0000; transform: skewX(-10deg); }
      }
    }
  }
`;