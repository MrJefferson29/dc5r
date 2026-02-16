import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../Context/AuthContext";
import { FiUser, FiMail, FiLock, FiCheckCircle, FiX, FiActivity } from "react-icons/fi";

const Register = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setActiveUser, setToken, api } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { data } = await api.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      if (data && data.token) {
        localStorage.setItem("authToken", data.token);
        setToken(data.token);
        if (data.user) {
          setActiveUser(data.user);
        }
        navigate("/all-pets");
      } else {
        setMessage("Registration succeeded but session could not be established.");
        setShowMessage(true);
      }
    } catch (error) {
      setMessage(
        error?.response?.data?.message ||
          "Registration unavailable. System maintenance in progress."
      );
      setShowMessage(true);
    }
  };

  return (
    <Styles>
      <div className="register-container">
        <div className="register-card">
          <header className="register-header">
            <span className="registry-tag"><FiActivity /> ID_CREATION_PROTOCOL</span>
            <h2>Create <span className="red">Profile</span></h2>
            <p>Join the elite network of DC5R component specialists and heritage collectors.</p>
          </header>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-field">
              <FiUser className="icon" />
              <input
                type="text"
                required
                id="name"
                name="name"
                placeholder="FULL NAME / TECHNICIAN ID"
                tabIndex={1}
              />
            </div>

            <div className="input-field">
              <FiMail className="icon" />
              <input
                type="email"
                required
                id="email"
                name="email"
                placeholder="REGISTRY EMAIL"
                tabIndex={2}
              />
            </div>

            <div className="input-field">
              <FiLock className="icon" />
              <input
                type="password"
                required
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder="SECURE ACCESS KEY (6+ CHARS)"
                tabIndex={3}
              />
            </div>

            <button type="submit" className="register-btn">Initialize Profile</button>

            <div className="form-footer">
              <span>Already verified? </span>
              <Link to="/login">Login to Terminal</Link>
            </div>
          </form>
        </div>

        {showMessage && (
          <div className="modal-overlay">
            <div className="message-box">
              <div className="status-icon"><FiCheckCircle /></div>
              <h3>System Update</h3>
              <p>{message}</p>
              <button className="close-btn" onClick={() => setShowMessage(false)}>
                <FiX /> Acknowledge
              </button>
            </div>
          </div>
        )}
      </div>
    </Styles>
  );
};

export default Register;

const Styles = styled.div`
  .register-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0a0a0a;
    background-image: radial-gradient(#111 1px, transparent 1px);
    background-size: 20px 20px;
    padding: 2rem;
  }

  .register-card {
    background: white;
    width: 100%;
    max-width: 500px;
    padding: 4rem 3.5rem;
    border-radius: 0;
    border-bottom: 8px solid #cc0000;
    box-shadow: 0 30px 60px rgba(0,0,0,0.4);
    position: relative;

    &::before {
        content: 'SYS_AUTH_REQ';
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 0.6rem;
        font-weight: 900;
        color: #eee;
        letter-spacing: 1px;
    }
  }

  .register-header {
    text-align: left;
    margin-bottom: 3rem;

    .registry-tag {
      color: #cc0000;
      text-transform: uppercase;
      letter-spacing: 3px;
      font-size: 0.75rem;
      font-weight: 900;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    h2 {
      font-family: 'Inter', sans-serif;
      font-weight: 900;
      font-size: 2.2rem;
      color: #111;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: -1.5px;
      
      .red { color: #cc0000; }
    }

    p {
      font-size: 0.85rem;
      color: #666;
      font-weight: 600;
      line-height: 1.6;
    }
  }

  .register-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .input-field {
    position: relative;
    display: flex;
    align-items: center;

    .icon {
      position: absolute;
      left: 15px;
      color: #111;
      font-size: 1.1rem;
    }

    input {
      width: 100%;
      padding: 16px 16px 16px 50px;
      border: 2px solid #eeeeee;
      background: #f8f8f8;
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: #111;
        background: white;
        box-shadow: 5px 5px 0px rgba(204, 0, 0, 0.05);
      }
    }
  }

  .register-btn {
    background: #111;
    color: white;
    padding: 18px;
    border: none;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    margin-top: 10px;

    &:hover {
      background: #cc0000;
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(204, 0, 0, 0.2);
    }
  }

  .form-footer {
    text-align: center;
    font-size: 0.8rem;
    color: #888;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 0.5px;

    a {
      color: #111;
      text-decoration: none;
      border-bottom: 2px solid #cc0000;
      margin-left: 5px;
      transition: 0.2s;
      &:hover { color: #cc0000; }
    }
  }

  /* Modal Styling */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(8px);
    display: flex; justify-content: center; align-items: center;
    z-index: 1000;
  }

  .message-box {
    background: white;
    padding: 3rem;
    max-width: 450px;
    width: 90%;
    text-align: center;
    border-top: 6px solid #cc0000;

    .status-icon {
      font-size: 3.5rem;
      color: #2ecc71; /* System Success Green */
      margin-bottom: 20px;
    }

    h3 {
      font-family: 'Inter', sans-serif;
      font-weight: 900;
      text-transform: uppercase;
      color: #111;
      margin-bottom: 12px;
    }

    p {
      color: #444;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 30px;
      line-height: 1.6;
    }

    .close-btn {
      background: #111;
      color: white;
      border: none;
      width: 100%;
      padding: 15px;
      font-weight: 900;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      text-transform: uppercase;
      transition: 0.2s;
      &:hover { background: #cc0000; }
    }
  }
`;