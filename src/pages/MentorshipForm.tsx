import { useEffect } from "react";
import Header from "@/components/Header";

const MentorshipForm = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // After script loads, force container background transparent
    script.onload = () => {
      const containers = document.getElementsByClassName("typeform-widget");
      for (let container of containers) {
        container.style.backgroundColor = "transparent";
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ height: "100vh", margin: 0, padding: 0, backgroundColor: "transparent" }}>
      <Header />

      <div
        data-tf-live="01JX77MSVYRPQBWYY443QAH2HX"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          backgroundColor: "transparent",  // container div background transparent
        }}
      ></div>
    </div>
  );
};

export default MentorshipForm;
