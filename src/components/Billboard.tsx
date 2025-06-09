import React from "react";
import { useNavigate } from "react-router-dom";

interface OcliqueVisualProps {
  mainTitle?: string;
  subtitle?: string;
  categories?: string[];
  tagline?: string;
  brandText?: string;
  year?: string;
  className?: string;
}

const pixelImages = [
  "/mentorship/undraw_educator_6dgp.svg",
  "/mentorship/undraw_instant-support_oav0.svg",
  "/mentorship/undraw_online-learning_tgmv.svg",
  "/mentorship/undraw_professor_d7zn.svg",
  "/mentorship/undraw_quiz_zvhe.svg",
  "/mentorship/undraw_social-interaction_6fi7.svg",
  "/mentorship/undraw_teacher_s628.svg",
  "/mentorship/undraw_teaching_58yg.svg",
  "/mentorship/undraw_youtube-tutorial_xgp1.svg",
  "/mentorship/undraw_online-learning_tgmv.svg",  // repeated if you want 11 total
  "/mentorship/undraw_professor_d7zn.svg",
];

const OcliqueVisual: React.FC<OcliqueVisualProps> = ({
  mainTitle = "SUI ON CAMPUS MENTORSHIP\nPROGRAM",
  subtitle = "",
  categories = [],
  tagline = "",
  brandText = "",
  year = "2025",
  className = "",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/mentorship-program");
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 ${className}`}>
      <div
        onClick={handleClick}
        className="poster w-full bg-black text-white cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_15px_rgba(100,149,255,0.7)]"
        title="Click to enter Mentorship Program"
      >
        <div className="w-full max-w-[1200px] mx-auto p-10 sm:p-8 md:p-10 flex flex-col justify-between font-sans">
          {/* Header */}
          <div className="flex justify-between items-start mb-10 flex-col md:flex-row md:items-start md:gap-4">
            <h1 className="text-[clamp(32px,8vw,64px)] font-black leading-[0.85] tracking-tight uppercase whitespace-pre-line text-left md:text-left">
              <center>{mainTitle}</center>
            </h1>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-between gap-5 mb-2 text-[clamp(16px,3vw,24px)] font-light opacity-90 text-left md:text-left">
            {categories.map((cat, i) => (
              <span key={i}>{cat}</span>
            ))}
          </div>

          {/* Pixel Art with Images */}
          <div className="flex-1 flex items-center justify-center my-10 relative">
            <div className="w-full max-w-[400px] md:max-w-[600px] h-[200px] md:h-[280px] grid grid-cols-12 grid-rows-8 gap-0.5 sm:h-[150px] xs:h-[120px]">
              {pixelImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`pixel-${i + 1}`}
                  className={`animate-pixel-pop pixel-${i + 1}`}
                  style={{ animationDelay: `${i * 0.3}s`, objectFit: "contain", width: "100%", height: "100%" }}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end mt-10 flex-col md:flex-row gap-5 text-center md:text-left">
            <div className="text-[clamp(14px,2.5vw,18px)] font-light leading-snug whitespace-pre-line">
              {tagline.split("green").map((part, index, array) => (
                <React.Fragment key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <span className="text-[#32FF32] font-medium">green</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="text-right">
              <div className="text-[clamp(16px,2.5vw,20px)] font-semibold">{brandText}</div>
              <div className="text-[clamp(14px,2vw,16px)] opacity-70">{year}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style>
        {`
          @keyframes pixel-pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); box-shadow: 0 0 15px rgba(50, 165, 250, 0.8); }
            100% { transform: scale(1); }
          }

          .animate-pixel-pop {
            animation: pixel-pop 1.2s ease-in-out infinite;
          }

          .pixel-1 { grid-column: 1 / 4; grid-row: 1 / 3; }
          .pixel-2 { grid-column: 1 / 4; grid-row: 5 / 7; }
          .pixel-3 { grid-column: 3 / 6; grid-row: 3 / 5; }
          .pixel-4 { grid-column: 5 / 8; grid-row: 1 / 3; }
          .pixel-5 { grid-column: 7 / 12; grid-row: 3 / 5; }
          .pixel-6 { grid-column: 9 / 12; grid-row: 1 / 3; }
          .pixel-7 { grid-column: 1 / 3; grid-row: 7 / 9; }
          .pixel-8 { grid-column: 3 / 5; grid-row: 5 / 9; }
          .pixel-9 { grid-column: 5 / 7; grid-row: 7 / 9; }
          .pixel-10 { grid-column: 7 / 9; grid-row: 5 / 9; }
          .pixel-11 { grid-column: 9 / 12; grid-row: 7 / 9; }
        `}
      </style>
    </div>
  );
};

export default OcliqueVisual;
