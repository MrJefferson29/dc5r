import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { FiSave, FiImage, FiBarChart2, FiInfo } from "react-icons/fi";
import {
  INVENTORY_MAIN_CATEGORIES,
  SUBCATEGORIES_BY_MAIN,
  hasSubcategories,
} from "../../constants/inventoryCategories";

const EditHorse = () => {
  const { api, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { name: slugParam } = useParams();

  const [form, setForm] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    description: "",
    componentType: "",
    condition: "",
    fits: "",
    views: "",
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHorse = async () => {
      try {
        const { data } = await api.get(`/horses/${encodeURIComponent(slugParam)}`);
        setForm({
          name: data.name || "",
          category: data.category || "",
          subcategory: data.subcategory || "",
          price: data.price || "",
          description: data.description || "",
          componentType: data.componentType || "",
          condition: data.condition || "",
          fits: Array.isArray(data.fits) ? data.fits.join("\n") : "",
          views: data.views ?? "",
        });
        setExistingImages(data.images || []);
      } catch (err) {
        console.error("Error loading horse", err);
        setError("Unable to load horse details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHorse();
  }, [api, slugParam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "category") next.subcategory = "";
      return next;
    });
  };

  const subcategoryOptions = form.category ? (SUBCATEGORIES_BY_MAIN[form.category] || []) : [];
  const showSubcategory = form.category && hasSubcategories(form.category);

  const handleImagesChange = (e) => {
    setImages(Array.from(e.target.files || []));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== "" && value !== null && typeof value !== "undefined") {
          fd.append(key, value);
        }
      });

      images.forEach((file) => {
        fd.append("images", file);
      });

        const { data } = await api.put(`/horses/${encodeURIComponent(slugParam)}`, fd, {
        headers: {
          authorization: `Bearer ${token || localStorage.getItem("authToken")}`,
        },
      });

      const slug = data.slug || data.name.replace(/\s+/g, "-").toLowerCase();
      navigate(`/pet/${encodeURIComponent(slug)}`);
    } catch (err) {
      console.error("Error updating horse", err);
      setError(
        err?.response?.data?.message || "Unable to update item. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <LoadingWrapper>
        <div className="loader"></div>
        <p>Retrieving Pedigree Records...</p>
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper>
      <header className="form-header">
        <span className="accent">Editor Mode</span>
        <h2>Edit Car / Spare Part</h2>
        <p>Updating: <strong>{form.name}</strong></p>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <SectionTitle><FiInfo /> General Information</SectionTitle>
        <div className="grid-2">
          <div className="field">
            <label>Item Name</label>
            <input name="name" type="text" required value={form.name} onChange={handleChange} />
          </div>
          <div className="field">
            <label>Main Category</label>
            <select name="category" required value={form.category} onChange={handleChange}>
              <option value="">Select main category</option>
              {INVENTORY_MAIN_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {showSubcategory && (
            <div className="field">
              <label>Subcategory</label>
              <select name="subcategory" required value={form.subcategory} onChange={handleChange}>
                <option value="">Select subcategory</option>
                {subcategoryOptions.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="grid-3">
          <div className="field">
            <label>Condition</label>
            <select name="condition" required value={form.condition} onChange={handleChange}>
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
          <div className="field">
            <label>Price</label>
            <input name="price" type="text" required value={form.price} onChange={handleChange} />
          </div>
        </div>

        <div className="grid-3">
          <div className="field">
            <label>
              <FiBarChart2 /> Manual View Count
            </label>
            <input
              name="views"
              type="number"
              min="0"
              value={form.views}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label>Description</label>
          <textarea
            name="description"
            rows={5}
            value={form.description}
            onChange={handleChange}
            placeholder="Describe specifications, included accessories, defects, etc."
          />
        </div>

        <div className="field">
          <label>Fits (one car model per line)</label>
          <textarea
            name="fits"
            rows={4}
            value={form.fits}
            onChange={handleChange}
            placeholder={`e.g.\nToyota Corolla 2012-2016\nHonda Civic 2015-2019`}
          />
        </div>

        <SectionTitle><FiImage /> Media Gallery</SectionTitle>
        {existingImages.length > 0 && (
          <div className="field">
            <label>Current Gallery</label>
            <div className="current-images">
              {existingImages.map((img, idx) => (
                <div key={idx} className="img-container">
                    <img src={img} alt={`horse-${idx}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="field">
          <label className="upload-box">
            <span>Replace All Images (Optional)</span>
            <input name="images" type="file" multiple accept="image/*" onChange={handleImagesChange} />
            <small>Uploading new images will overwrite the current gallery.</small>
          </label>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="save-btn" disabled={submitting}>
          {submitting ? "Synchronizing..." : <><FiSave /> Update Registry</>}
        </button>
      </form>
    </Wrapper>
  );
};

export default EditHorse;

const LoadingWrapper = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    height: 80vh;
    color: #1a2e26;
    font-family: 'Playfair Display', serif;
    .loader {
        border: 3px solid #f3f3f3;
        border-top: 3px solid #c5a059;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;

const SectionTitle = styled.h3`
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #c5a059;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 1rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
`;

const Wrapper = styled.div`
  max-width: 850px;
  margin: 8rem auto 4rem;
  padding: 3.5rem;
  background: #ffffff;
  border: 1px solid #f0efeb;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.05);

  .form-header {
    text-align: center;
    margin-bottom: 3rem;
    .accent { color: #c5a059; text-transform: uppercase; letter-spacing: 3px; font-weight: 700; font-size: 0.75rem; }
    h2 { font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #1a2e26; }
    p { color: #888; margin-top: 5px; }
  }

  .form { display: flex; flex-direction: column; gap: 1.8rem; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; }

  @media (max-width: 600px) { .grid-2, .grid-3 { grid-template-columns: 1fr; } }

  .field {
    display: flex; flex-direction: column;
    label { font-size: 0.75rem; text-transform: uppercase; font-weight: 700; margin-bottom: 8px; color: #1a2e26; }
    input, select, textarea {
      padding: 12px; border: 1px solid #e0e0e0; background: #fafafa;
      &:focus { border-color: #c5a059; background: #fff; outline: none; }
    }
  }

  .current-images {
    display: flex; flex-wrap: wrap; gap: 10px;
    img { width: 100px; height: 100px; object-fit: cover; border: 1px solid #eee; }
  }

  .upload-box {
    border: 2px dashed #e0e0e0; padding: 25px; text-align: center; cursor: pointer;
    span { font-weight: 700; color: #c5a059; display: block; margin-bottom: 5px; }
    input { display: none; }
    small { color: #999; }
    &:hover { border-color: #c5a059; background: #fdfcf8; }
  }

  .save-btn {
    background: #1a2e26; color: white; padding: 20px; border: none; font-weight: 700;
    text-transform: uppercase; letter-spacing: 2px; cursor: pointer; display: flex;
    align-items: center; justify-content: center; gap: 10px;
    &:hover { background: #c5a059; transform: translateY(-2px); }
  }

  .error { color: #d9534f; font-weight: 700; text-align: center; }
`;