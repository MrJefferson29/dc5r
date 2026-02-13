import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { AuthContext } from "../../Context/AuthContext";
import { FiLock, FiMail, FiAlertCircle, FiX, FiShield } from "react-icons/fi";

const Login = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setActiveUser, setToken, api } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { data } = await api.post('https://equine-excellence.onrender.com/api/auth/login', { email, password });

      if (data && data.token) {
        localStorage.setItem("authToken", data.token);
        setToken(data.token);
        if (data.user) {
          setActiveUser(data.user);
        }
        navigate('/all-pets');
      } else {
        setShowMessage(true);
        setErrorMessage("Access denied. Please verify your credentials.");
      }
    } catch (error) {
      setShowMessage(true);
      setErrorMessage(
        error?.response?.data?.message || "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <Styles>
      <div className="login-container">
        <div className="login-card">
          <header className="login-header">
            <span className="registry-tag"><FiShield /> Secure Terminal</span>
            <h2>Member <span className="red">Login</span></h2>
            <p>Authorized access only. Enter your credentials to manage inventory.</p>
          </header>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-field">
              <FiMail className="icon" />
              <input
                type="email"
                required
                id="email"
                name="email"
                placeholder="REGISTRY EMAIL"
                tabIndex={1}
              />
            </div>

            <div className="input-field">
              <FiLock className="icon" />
              <input
                type="password"
                required
                id="password"
                name="password"
                placeholder="ACCESS KEY"
                tabIndex={2}
              />
            </div>

            <div className="form-utils">
              <Link to="/forgotpassword">Forgot Key?</Link>
              <Link to="/register" className="signup-link">Apply for Registry</Link>
            </div>

            <button type="submit" className="login-btn">Initialize Session</button>
          </form>
        </div>

        {showMessage && (
          <div className="modal-overlay">
            <div className="message-box">
              <FiAlertCircle className="err-icon" />
              <h3>System Error</h3>
              <p>{errorMessage}</p>
              <button className="close-btn" onClick={() => setShowMessage(false)}>
                <FiX /> Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </Styles>
  );
};

export default Login;

const Styles = styled.div`
  .login-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* Subtle industrial grid pattern */
    background-color: #0a0a0a;
    background-image: radial-gradient(#111 1px, transparent 1px);
    background-size: 20px 20px;
    padding: 20px;
  }

  .login-card {
    background: #ffffff;
    width: 100%;
    max-width: 450px;
    padding: 4rem 3.5rem;
    border-radius: 0; /* Sharp corners */
    border-bottom: 8px solid #cc0000; /* Thick JDM accent */
    box-shadow: 0 30px 60px rgba(0,0,0,0.5);
    text-align: center;
    position: relative;

    &::before {
        content: 'DC5R_PROTOCOL_v2.0';
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 0.6rem;
        font-weight: 900;
        color: #eee;
        letter-spacing: 1px;
    }
  }

  .login-header {
    margin-bottom: 3rem;

    .registry-tag {
      color: #cc0000;
      text-transform: uppercase;
      letter-spacing: 3px;
      font-size: 0.75rem;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
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
      letter-spacing: -1px;

      .red { color: #cc0000; }
    }

    p {
      font-size: 0.85rem;
      color: #666;
      font-weight: 600;
      line-height: 1.5;
    }
  }

  .login-form {
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
        box-shadow: 5px 5px 0px rgba(204, 0, 0, 0.1);
      }
    }
  }

  .form-utils {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    margin: 0;
    font-weight: 800;
    text-transform: uppercase;

    a {
      color: #999;
      text-decoration: none;
      transition: 0.2s;
      &:hover { color: #cc0000; }
    }

    .signup-link {
      color: #111;
      border-bottom: 2px solid #cc0000;
    }
  }

  .login-btn {
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

  /* Modal Enhancements */
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
    padding: 50px;
    max-width: 400px;
    width: 90%;
    text-align: center;
    border-top: 5px solid #cc0000;

    .err-icon {
      font-size: 4rem;
      color: #cc0000;
      margin-bottom: 20px;
    }

    h3 {
      font-family: 'Inter', sans-serif;
      font-weight: 900;
      text-transform: uppercase;
      color: #111;
      margin-bottom: 10px;
    }

    p {
      color: #444;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 30px;
    }

    .close-btn {
      background: #111;
      color: white;
      border: none;
      width: 100%;
      padding: 15px;
      font-weight: 900;
      text-transform: uppercase;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      &:hover { background: #cc0000; }
    }
  }
`;