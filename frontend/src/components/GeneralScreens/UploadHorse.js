import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { FiUploadCloud, FiAlertCircle } from "react-icons/fi";

const UploadHorse = () => {
  const { api, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    componentType: "",
    condition: "",
    fits: "",
  });
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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
        // send all fields including "fits" (newline-delimited string)
        fd.append(key, value);
      });
      images.forEach((file) => {
        fd.append("images", file);
      });

      const { data } = await api.post("/horses", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token || localStorage.getItem("authToken")}`,
        },
      });

      const slug = data.slug || data.name.replace(/\s+/g, "-").toLowerCase();
      navigate(`/pet/${slug}`);
    } catch (err) {
      console.error("Error uploading horse", err);
      setError(
        err?.response?.data?.message ||
          "Unable to upload item. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <header className="form-header">
        <span className="accent">Inventory Management</span>
        <h2>Add Car or Spare Part</h2>
        <p>Provide clear details so buyers can easily find the right component for their vehicle.</p>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <div className="field">
            <label htmlFor="name">Item Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Front Bumper for Toyota Corolla"
            />
          </div>

          <div className="field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              required
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Engine & Drivetrain">Engine &amp; Drivetrain</option>
              <option value="Body & Exterior">Body &amp; Exterior</option>
              <option value="Interior & Comfort">Interior &amp; Comfort</option>
              <option value="Electrical & Lighting">Electrical &amp; Lighting</option>
              <option value="Wheels & Tires">Wheels &amp; Tires</option>
              <option value="Performance Upgrades">Performance Upgrades</option>
            </select>
          </div>
        </div>

        <div className="grid-3">
          <div className="field">
            <label htmlFor="componentType">Component Type</label>
            <select
              id="componentType"
              name="componentType"
              required
              value={form.componentType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="interior">Interior</option>
              <option value="exterior">Exterior</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="condition">Condition</label>
            <input
              id="condition"
              name="condition"
              type="text"
              required
              value={form.condition}
              onChange={handleChange}
              placeholder="e.g. New, Used - like new"
            />
          </div>

          <div className="field">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="text"
              required
              value={form.price}
              onChange={handleChange}
              placeholder="$ 120"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={form.description}
            onChange={handleChange}
            placeholder="Describe specifications, included accessories, defects, and other useful details..."
          />
        </div>

        <div className="field">
          <label htmlFor="fits">Fits (one car model per line)</label>
          <textarea
            id="fits"
            name="fits"
            rows={4}
            value={form.fits}
            onChange={handleChange}
            placeholder={`e.g.\nToyota Corolla 2012-2016\nHonda Civic 2015-2019`}
          />
        </div>

        <div className="field">
          <label htmlFor="images" className="file-label">
            <FiUploadCloud />
            <span>Click to upload gallery images</span>
            <input
              id="images"
              name="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImagesChange}
              required
            />
          </label>
          {images.length > 0 && (
            <div className="file-count">{images.length} images selected</div>
          )}
        </div>

        {error && (
          <div className="error-box">
            <FiAlertCircle /> {error}
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? "Saving item..." : "Confirm & Add Item"}
        </button>
      </form>
    </Wrapper>
  );
};

export default UploadHorse;

const Wrapper = styled.div`
  max-width: 800px;
  margin: 8rem auto 4rem;
  padding: 3rem;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0efeb;

  .form-header {
    text-align: center;
    margin-bottom: 3rem;
    
    .accent {
      color: #c5a059;
      text-transform: uppercase;
      letter-spacing: 3px;
      font-weight: 700;
      font-size: 0.75rem;
      display: block;
      margin-bottom: 0.5rem;
    }

    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem;
      color: #1a2e26;
      margin-bottom: 10px;
    }

    p {
      color: #777;
      font-size: 0.95rem;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .input-group, .grid-3 {
    display: grid;
    gap: 1.5rem;
  }

  .input-group { grid-template-columns: 1fr 1fr; }
  .grid-3 { grid-template-columns: 1fr 1fr 1fr; }

  @media (max-width: 600px) {
    .input-group, .grid-3 { grid-template-columns: 1fr; }
  }

  .field {
    display: flex;
    flex-direction: column;

    label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #1a2e26;
    }

    input, select, textarea {
      padding: 12px 16px;
      border-radius: 2px;
      border: 1px solid #e0e0e0;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #fafafa;

      &:focus {
        outline: none;
        border-color: #c5a059;
        background: white;
      }
    }
  }

  .file-label {
    border: 2px dashed #e0e0e0;
    padding: 30px;
    text-align: center;
    cursor: pointer;
    background: #fafafa;
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    input { display: none; }
    svg { font-size: 2rem; color: #c5a059; }
    span { font-weight: 600; color: #666; font-size: 0.9rem; }

    &:hover {
      border-color: #c5a059;
      background: #fdfcf8;
    }
  }

  .file-count {
    margin-top: 10px;
    font-size: 0.85rem;
    color: #1a2e26;
    font-weight: 700;
    text-align: center;
  }

  .error-box {
    background: #fff5f5;
    color: #c00;
    padding: 15px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .submit-btn {
    margin-top: 1rem;
    padding: 18px;
    border: none;
    background-color: #1a2e26;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    transition: 0.3s;

    &:hover:not(:disabled) {
      background-color: #c5a059;
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;