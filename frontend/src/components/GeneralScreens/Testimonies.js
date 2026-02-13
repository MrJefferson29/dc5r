import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Dawn & Derek",
    feedback: "Finding Bentley through this platform changed our lives. The breeder was transparent, the horse arrived healthy, calm, and beautifully trained. Our vet was impressed with his condition.",
    location: "Boston, MA",
    rating: 5,
  },
  {
    name: "Miller Temili",
    feedback: "I found my mare here in 2019 and she’s been the most gentle companion. The process was smooth, and the breeder communication was clear. Truly professional.",
    location: "Los Angeles, CA",
    rating: 5,
  },
  {
    name: "Michael Harrington",
    feedback: "Ember has the calmest temperament and adapts easily to new environments. She’s great with kids and other animals on the ranch. People constantly compliment her.",
    location: "Bradford, UK",
    rating: 4.5,
  },
  {
    name: "Gemma Rose",
    feedback: "Talulah has such a bold personality. The breeder provided health records and guidance even after purchase. This platform truly cares about horses and owners alike.",
    location: "Scottsdale, AZ",
    rating: 5,
  },
];

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, i) => <FaStar key={`f-${i}`} color="#c5a059" />)}
      {halfStar && <FaStarHalfAlt color="#c5a059" />}
      {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`e-${i}`} color="#c5a059" />)}
    </>
  );
};

const SliderSection = styled.section`
  width: 100%;
  padding: 4rem 0;
  background-color: transparent;
  overflow: hidden; /* Prevents horizontal scroll on small screens */
`;

const SliderWrap = styled.div`
  max-width: 1300px;
  margin: 0 auto;

  .slick-list {
    margin: 0 -15px; /* Counteracts card padding */
    padding: 20px 0 !important; /* Space for shadows */
  }

  .slick-slide {
    padding: 0 15px;
    height: inherit !important; /* Ensures cards in a row have same height */
  }

  .slick-slide > div {
    height: 100%;
  }

  /* Dot Styling */
  .slick-dots {
    bottom: -40px;
    li {
      margin: 0 5px;
      button:before {
        color: #1a2e26;
        font-size: 8px;
        opacity: 0.3;
      }
      &.slick-active button:before {
        color: #c5a059;
        opacity: 1;
        font-size: 10px;
      }
    }
  }
`;

const TestimonialCard = styled.div`
  background: #ffffff;
  border: 1px solid #eaeaea;
  padding: 3rem 2rem;
  height: 100%;
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;

  &:hover {
    border-color: #c5a059;
    box-shadow: 0 15px 45px rgba(0,0,0,0.06);
  }

  &::before {
    content: "“";
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Playfair Display', serif;
    font-size: 4rem;
    color: #f1f1f1;
    line-height: 1;
  }

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
    margin: 0 5px; /* Tightens space on mobile */
  }
`;

const StarBox = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 4px;
`;

const QuoteText = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: #555;
  font-style: italic;
  margin-bottom: 2rem;
  flex-grow: 1; /* Pushes author info to the bottom */

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const AuthorBlock = styled.div`
  .author-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    color: #1a2e26;
    margin: 0;
  }
  .author-location {
    font-size: 0.75rem;
    color: #c5a059;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 700;
    margin-top: 5px;
  }
`;

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '30px', /* Shows a hint of the next card */
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '20px',
        }
      }
    ]
  };

  return (
    <SliderSection>
      <SliderWrap>
        <Slider {...settings}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ height: '100%' }}>
              <TestimonialCard>
                <div>
                  <StarBox>{renderStars(t.rating)}</StarBox>
                  <QuoteText>"{t.feedback}"</QuoteText>
                </div>
                <AuthorBlock>
                  <h4 className="author-name">{t.name}</h4>
                  <p className="author-location">{t.location}</p>
                </AuthorBlock>
              </TestimonialCard>
            </div>
          ))}
        </Slider>
      </SliderWrap>
    </SliderSection>
  );
};

export default TestimonialSlider;