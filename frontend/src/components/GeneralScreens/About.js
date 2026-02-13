import React from "react";
import styled from "styled-components";

// Asset placeholders - Replace with your automotive/RSX images
import HeroCar from "../../Assets/nas4.webp"; 
import GarageScene from "../../Assets/nas5.jpg";
import PartsDetail from "../../Assets/nas6.jpg";

const Theme = {
  primary: "#0a0a0a", // Obsidian Black
  accent: "#cc0000",  // Race Red
  text: "#333333",
  light: "#ffffff",   // Pure White
  gray: "#f4f4f4",
  secondary: "#1a1a1a" // Graphite
};

const Container = styled.div`
  font-family: 'Inter', sans-serif; 
  background-color: ${Theme.light};
  color: ${Theme.text};
  overflow-x: hidden;
`;

const PromoBar = styled.div`
  background: ${Theme.accent};
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const HeroSection = styled.header`
  position: relative;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${HeroCar});
  background-size: cover;
  background-position: center;
  text-align: center;

  h1 {
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 900;
    text-transform: uppercase;
    margin: 0;
    font-style: italic;
  }

  p {
    font-size: 1.2rem;
    letter-spacing: 4px;
    font-weight: 300;
  }
`;

const Wrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 20px;
`;

const EditorialSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 8rem;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    direction: ${props => (props.reverse ? "rtl" : "ltr")};
  }
`;

const TextBlock = styled.div`
  direction: ltr; 
  
  .pre-title {
    color: ${Theme.accent};
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: block;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2.8rem;
    font-weight: 900;
    color: ${Theme.primary};
    margin-bottom: 1.5rem;
    line-height: 1.1;
    text-transform: uppercase;
  }

  p {
    font-size: 1.05rem;
    line-height: 1.8;
    color: #555;
    margin-bottom: 1.5rem;
  }

  .signature {
    margin-top: 2rem;
    h4 { font-weight: 900; margin: 0; color: ${Theme.primary}; }
    span { color: #888; font-size: 0.9rem; }
  }
`;

const ImageCard = styled.div`
  position: relative;
  border: 1px solid #ddd;
  padding: 10px;
  background: white;
  
  &::before {
    content: 'DC5R';
    position: absolute;
    top: -20px;
    right: 20px;
    font-size: 5rem;
    font-weight: 900;
    color: ${Theme.gray};
    z-index: -1;
  }

  img {
    width: 100%;
    display: block;
    height: 450px;
    object-fit: cover;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  background: ${Theme.gray};
  padding: 4rem 2rem;
  margin: 4rem 0;
`;

const ValueItem = styled.div`
  background: white;
  padding: 2.5rem;
  border-bottom: 4px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-bottom: 4px solid ${Theme.accent};
    transform: translateY(-5px);
  }

  h3 {
    color: ${Theme.primary};
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  p { font-size: 0.95rem; color: #666; margin: 0; }
`;

const CTA = styled.div`
  background: ${Theme.primary};
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  
  h2 {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }

  button {
    background: ${Theme.accent};
    color: white;
    border: none;
    padding: 18px 50px;
    font-size: 0.9rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: white;
      color: ${Theme.primary};
    }
  }
`;

const Footer = styled.footer`
  background: ${Theme.secondary};
  padding: 4rem 2rem;
  text-align: center;
  color: #666;
  font-size: 0.85rem;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 2rem;
    a { color: white; text-decoration: none; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; }
  }
`;

const About = () => {
  return (
    <Container>
      <PromoBar>
        WELCOME BACK! - USE CODE "POWEROFDREAMS" AT CHECKOUT FOR ORDERS $100+
      </PromoBar>

      <HeroSection>
        <div>
          <p>BUILT TO INSPIRE</p>
          <h1>About Us</h1>
        </div>
      </HeroSection>

      <Wrapper>
        <EditorialSection>
          <TextBlock>
            <span className="pre-title">The Foundation</span>
            <h2>Who is DC5R Parts?</h2>
            <p>
              In 2015, a well-rounded page was created with <strong>YOU</strong> in mind. 
              Offering not only excellent customer relations but also many rare JDM Products, 
              DIY Project Guides, and Performance Car Part Reviews.
            </p>
            <p>
              My passion for the DC5 chassis started back in 2006. I watched a website ad 
              of a 2006 Acura RSX Type S. I completely fell in love with the car's thrilling 
              sound and body lines—I knew I had to get it.
            </p>
          </TextBlock>
          <ImageCard>
            <img src={GarageScene} alt="Garage Build" />
          </ImageCard>
        </EditorialSection>

        <EditorialSection reverse>
          <TextBlock>
            <span className="pre-title">The Journey</span>
            <h2>The Type R Soul</h2>
            <p>
              In mid-2015, I bought my dream spec, a 2005/06 Acura RSX Type S in Vivid Blue Pearl. 
              I built my own to a Type R spec model, blending the best of both worlds: 
              Type S Styling and Type R Soul.
            </p>
            <p>
              I decided to make a difference in the car community because I realized many shops 
              lacked passion. They didn't connect with their customers; they only wanted to 
              make a buck. DC5R Parts was born to change that.
            </p>
            <div className="signature">
               <h4>Luis Brito</h4>
               <span>Founder of DC5R Parts</span>
            </div>
          </TextBlock>
          <ImageCard>
            <img src={PartsDetail} alt="Performance Parts" />
          </ImageCard>
        </EditorialSection>

        <ValuesGrid>
          <ValueItem>
            <h3>Rare JDM Products</h3>
            <p>Access to hard-to-find components directly from Japan for the DC5 chassis.</p>
          </ValueItem>
          <ValueItem>
            <h3>DIY Project Guides</h3>
            <p>Countless hours in the garage translated into step-by-step guides for the community.</p>
          </ValueItem>
          <ValueItem>
            <h3>Customer Passion</h3>
            <p>Built by a customer, for the customers. We connect through the love of the build.</p>
          </ValueItem>
        </ValuesGrid>
      </Wrapper>

      <CTA>
        <h2>The Journey Continues</h2>
        <p>The "Built To Inspire" way of thinking will always be my passion.</p>
        <button onClick={() => window.location.href='mailto:contact@dc5rparts.com'}>
          Contact Luis
        </button>
      </CTA>
    </Container>
  );
};

export default About;