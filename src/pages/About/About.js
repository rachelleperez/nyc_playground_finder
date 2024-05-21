import React from "react";
import { useNavigate } from "react-router-dom";
import Main from "../../components/Main/Main";

const About = () => {
  const navigate = useNavigate();

  return (
    <Main currentPage="About">
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
        </section>

        <section>
          <h2>Explore the Project</h2>
          <p>
            Select from the options below to learn more by reviewing the source
            code or connecting the author.
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
      </div>
    </Main>
  );
};

export default About;
