import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <h1>About NYC Playground Finder</h1>

      <section>
        <h2>What is the NYC Playground Finder?</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          scelerisque leo eu semper malesuada.
        </p>
      </section>

      <section>
        <h2>How was NYC Playground Finder made?</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          scelerisque leo eu semper malesuada.
        </p>
        <button
          onClick={() => (window.location.href = "https://www.google.com/")}
        >
          Source Code
        </button>
        <button
          onClick={() => (window.location.href = "mailto:author@example.com")} // TODO: LinkedIn or email
        >
          Connect with Author
        </button>
      </section>

      <button onClick={() => navigate("/")}>Back to Search</button>
    </div>
  );
};

export default About;