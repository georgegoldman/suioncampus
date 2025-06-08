import { useEffect } from "react";
import Header from "@/components/Header";

const MentorshipProgram = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ height: "100vh", margin: 0, padding: 0 }}>
      {/* Optional: If you don't want the header, remove this line */}
      <Header />

      <div
        data-tf-live="01JX77MSVYRPQBWYY443QAH2HX"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      ></div>
    </div>
  );
};

export default MentorshipProgram;
