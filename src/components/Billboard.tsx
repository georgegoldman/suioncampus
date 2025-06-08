import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface OcliqueVisualProps {
  mainTitle?: string;
  subtitle?: string;
  categories?: string[];
  tagline?: string;
  brandText?: string;
  year?: string;
  className?: string;
}

const OcliqueVisual: React.FC<OcliqueVisualProps> = ({ 
  mainTitle = "MENTORSHIP\nPROGRAM",
  subtitle = "",
  categories = ["Frontend", "Backend", "UIUX", "Product"],
  tagline = "Product, Project\nManager.",
  brandText = "AMBASADOR",
  year = "2025",
  className = "" 
}) => {
  const [activeAnimation, setActiveAnimation] = useState(false);
  const navigate = useNavigate();

  // Animate the pixel art on click
  const handleClick = () => {
    setActiveAnimation(true);


    setTimeout(() => {
        setActiveAnimation(false);
        navigate("/mentorship-program"); //<-- Replace with your actual route
    }, 2000);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${className}`}>
      <style jsx>{`
        .poster {
          width: 100%;
          max-width: 600px;
          aspect-ratio: 3/4;
          background: #000000;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          font-family: 'Arial', -apple-system, BlinkMacSystemFont, sans-serif;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .poster:hover {
          transform: scale(1.02);
        }

        .poster:active {
          transform: scale(0.98);
        }

        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
        }

        .main-title {
          font-size: clamp(32px, 8vw, 64px);
          font-weight: 900;
          color: white;
          line-height: 0.85;
          letter-spacing: -0.02em;
          white-space: pre-line;
          text-transform: uppercase;
          margin: 0;
        }

        .circle {
          width: clamp(60px, 12vw, 100px);
          height: clamp(60px, 12vw, 100px);
          background: white;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .categories {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .category {
          color: white;
          font-size: clamp(16px, 3vw, 24px);
          font-weight: 300;
          opacity: 0.9;
        }

        .pixel-art-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 40px 0;
          position: relative;
        }

        .pixel-art {
          width: 100%;
          max-width: 400px;
          height: 200px;
          position: relative;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: repeat(8, 1fr);
          gap: 2px;
        }

        .pixel-block {
          background: #32FF32;
          transition: all 0.3s ease;
          transform: scale(1);
        }

        .pixel-block.animate {
          animation: pixelPop 0.6s ease-in-out;
        }

        @keyframes pixelPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); box-shadow: 0 0 15px rgba(50, 255, 50, 0.8); }
          100% { transform: scale(1); }
        }

        /* Define the exact pixel pattern from the image */
        .pixel-1 { grid-column: 1/4; grid-row: 1/3; }
        .pixel-2 { grid-column: 1/4; grid-row: 5/7; }
        .pixel-3 { grid-column: 3/6; grid-row: 3/5; }
        .pixel-4 { grid-column: 5/8; grid-row: 1/3; }
        .pixel-5 { grid-column: 7/12; grid-row: 3/5; }
        .pixel-6 { grid-column: 9/12; grid-row: 1/3; }
        .pixel-7 { grid-column: 1/3; grid-row: 7/9; }
        .pixel-8 { grid-column: 3/5; grid-row: 5/9; }
        .pixel-9 { grid-column: 5/7; grid-row: 7/9; }
        .pixel-10 { grid-column: 7/9; grid-row: 5/9; }
        .pixel-11 { grid-column: 9/12; grid-row: 7/9; }

        .footer-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 40px;
        }

        .tagline {
          color: white;
          font-size: clamp(14px, 2.5vw, 18px);
          font-weight: 300;
          line-height: 1.4;
          white-space: pre-line;
        }

        .tagline .green-text {
          color: #32FF32;
          font-weight: 500;
        }

        .brand-info {
          text-align: right;
          color: white;
        }

        .brand-name {
          font-size: clamp(16px, 2.5vw, 20px);
          font-weight: 600;
          margin-bottom: 4px;
        }

        .year {
          font-size: clamp(14px, 2vw, 16px);
          opacity: 0.7;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .poster {
            padding: 30px 20px;
            aspect-ratio: 3/4.5;
          }

          .categories {
            flex-direction: column;
            gap: 15px;
            text-align: center;
            margin-bottom: 30px;
          }

          .header-section {
            flex-direction: column;
            align-items: center;
            gap: 20px;
            margin-bottom: 30px;
          }

          .main-title {
            text-align: center;
          }

          .pixel-art {
            height: 150px;
          }

          .footer-section {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .brand-info {
            text-align: center;
          }

          .tagline {
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .poster {
            padding: 20px 15px;
          }

          .pixel-art {
            height: 120px;
            gap: 1px;
          }

          .categories {
            gap: 10px;
          }
        }
      `}</style>

      <div className="poster" onClick={handleClick}>
        <div className="header-section">
          <h1 className="main-title">{mainTitle}</h1>
          <div className="circle"></div>
        </div>

        <div className="categories">
          {categories.map((category, index) => (
            <span key={index} className="category">{category}</span>
          ))}
        </div>

        <div className="pixel-art-container">
          <div className="pixel-art">
            {[...Array(11)].map((_, index) => (
              <div 
                key={index} 
                className={`pixel-block pixel-${index + 1} ${activeAnimation ? 'animate' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        <div className="footer-section">
          <div className="tagline">
            {tagline.split('green').map((part, index, array) => (
              <React.Fragment key={index}>
                {part}
                {index < array.length - 1 && <span className="green-text">green</span>}
              </React.Fragment>
            ))}
          </div>
          <div className="brand-info">
            <div className="brand-name">{brandText}</div>
            <div className="year">{year}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OcliqueVisual;