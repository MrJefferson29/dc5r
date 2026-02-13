import React, { useState } from 'react';
import styled from 'styled-components';
import { FiShield, FiMail, FiCheckCircle, FiTruck, FiSettings } from 'react-icons/fi';

const CONTACT_EMAIL = 'dc5rexcellence@gmail.com';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    orderNumber: '',
    interestType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.interestType) newErrors.interestType = 'Please select a reason for contact';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const body = [
      'DC5R PARTS - TECHNICAL INQUIRY',
      '---------------------------------',
      `Customer: ${form.name || 'Anonymous'}`,
      `Email: ${form.email}`,
      `Order #: ${form.orderNumber || 'N/A'}`,
      `Inquiry Type: ${form.interestType}`,
      '',
      'Message:',
      form.message || 'No additional details provided.'
    ].join('\n');

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Support Inquiry - DC5R Parts')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <PageWrapper>
      {/* Support Policies Section */}
      <PolicySection>
        <span className="accent-tag">Customer Care</span>
        <TitleSans>Support & Shipping Policies</TitleSans>
        <MissionText>
          We are committed to the <strong>PERFORMANCE COMMUNITY</strong>. Every order is handled with the precision of a professional race crew. Please review our service terms before submitting an inquiry.
        </MissionText>
        <PolicyGrid>
          <li><FiTruck /> Orders are typically processed within 48–72 business hours.</li>
          <li><FiShield /> Rare JDM imports may have extended lead times due to customs.</li>
          <li><FiCheckCircle /> Tracking numbers are automatically sent via email upon dispatch.</li>
          <li><FiSettings /> Technical support is available for all performance parts purchased here.</li>
        </PolicyGrid>
      </PolicySection>

      {/* Contact Form */}
      <FormSection>
        <div className="header-box">
          <FiMail className="icon" />
          <TitleSans>Technical Inquiry Desk</TitleSans>
        </div>
        
        {submitted && (
          <SuccessBanner>
            <FiCheckCircle /> Ticket drafted. Please hit "Send" in your email client to finalize.
          </SuccessBanner>
        )}

        <form onSubmit={handleSubmit}>
          <FormGrid>
            <div className="field">
              <label>Full Name</label>
              <input type="text" placeholder="Driver Name" onChange={(e) => setForm({...form, name: e.target.value})} />
            </div>
            <div className="field">
              <label>Email Address *</label>
              <input type="email" placeholder="email@vtec-motors.com" onChange={(e) => setForm({...form, email: e.target.value})} />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </FormGrid>

          <FormGrid>
            <div className="field">
              <label>Order Number (If applicable)</label>
              <input type="text" placeholder="#10254" onChange={(e) => setForm({...form, orderNumber: e.target.value})} />
            </div>
            <div className="field">
              <label>Inquiry Type *</label>
              <select onChange={(e) => setForm({...form, interestType: e.target.value})}>
                <option value="">Select Reason</option>
                <option value="Shipping">Shipping/Tracking Status</option>
                <option value="Technical">Technical/Installation Help</option>
                <option value="Parts">Product Availability</option>
                <option value="Returns">Returns & Warranty</option>
              </select>
              {errors.interestType && <span className="error">{errors.interestType}</span>}
            </div>
          </FormGrid>

          <div className="field">
            <label>How can our crew assist you?</label>
            <textarea rows="4" placeholder="Describe the part or order issue in detail..." onChange={(e) => setForm({...form, message: e.target.value})} />
          </div>

          <SubmitButton type="submit">Deploy Inquiry</SubmitButton>
        </form>
      </FormSection>

      <SupportBox>
        <FiShield className="icon" />
        <div>
          <h4>Privacy & Security</h4>
          <p>Your vehicle data and personal records are encrypted. We strictly use your info for build support and order logistics.</p>
        </div>
      </SupportBox>
    </PageWrapper>
  );
};

export default Contact;

// --- Styled Components ---

const PageWrapper = styled.div`
  background-color: #f4f4f4;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const TitleSans = styled.h2`
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  color: #111;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const PolicySection = styled.div`
  background: white;
  padding: 3rem;
  max-width: 900px;
  width: 100%;
  border: 1px solid #ddd;
  text-align: center;

  .accent-tag {
    color: #cc0000;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.75rem;
    font-weight: 900;
    margin-bottom: 10px;
    display: block;
  }
`;

const MissionText = styled.p`
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const PolicyGrid = styled.ul`
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  padding: 2rem 0 0 0;
  list-style-type: none;
  border-top: 2px solid #111;

  li {
    font-size: 0.85rem;
    color: #111;
    font-weight: 600;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    line-height: 1.4;

    svg { color: #cc0000; font-size: 1.1rem; flex-shrink: 0; }
  }

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const FormSection = styled.div`
  background: white;
  padding: 4rem;
  max-width: 900px;
  width: 100%;
  border: 1px solid #111;
  box-shadow: 10px 10px 0px #111;

  .header-box {
    text-align: center;
    margin-bottom: 3rem;
    .icon { font-size: 2.5rem; color: #cc0000; margin-bottom: 10px; }
  }

  .field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    label { font-size: 0.7rem; text-transform: uppercase; font-weight: 900; margin-bottom: 8px; color: #111; }
    input, select, textarea {
      padding: 12px; border: 2px solid #eee; background: #fff;
      font-weight: 600;
      &:focus { border-color: #111; outline: none; background: #fafafa; }
    }
    .error { color: #cc0000; font-size: 0.7rem; margin-top: 5px; font-weight: 900; text-transform: uppercase; }
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 20px;
  background: #111;
  color: white;
  border: none;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: 0.2s;
  border-left: 6px solid #cc0000;

  &:hover { background: #cc0000; border-left-color: #111; }
`;

const SuccessBanner = styled.div`
  background: #111;
  color: white;
  padding: 15px;
  margin-bottom: 2rem;
  font-size: 0.85rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  border-left: 5px solid #cc0000;
`;

const SupportBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 600px;
  color: #666;
  .icon { font-size: 2.5rem; color: #111; opacity: 0.2; }
  h4 { font-size: 0.8rem; margin-bottom: 5px; color: #111; text-transform: uppercase; font-weight: 900; }
  p { font-size: 0.8rem; margin: 0; line-height: 1.5; }
`;