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
            This tool is a web application designed to help users search for and
            discover playgrounds in New York City based on specific search
            criteria. It provides detailed information about each playground
            discovered, including weather data and an interactive map, enhancing
            the user experience by offering comprehensive insights into each
            playground.
          </p>
        </section>

        <section>
          <h2>How was NYC Playground Finder made?</h2>
          <p>
            The application was built using a tech stack primarily consisting of
            JavaScript and React, complemented by HTML and CSS for the frontend
            structure and styling. It leverages various external APIs, including
            the NYC Open Data API for playground data, the Open-Meteo API for
            weather information, and OpenStreetMap for map integration. The
            project is hosted on a GitHub repository (linked below).
          </p>
        </section>

        <section>
          <h2>Explore the Project</h2>
          <p>
            Select from the options below to learn more by reviewing the source
            code or connecting with the author.
          </p>
          <button
            onClick={() =>
              (window.location.href =
                "https://github.com/rachelleperez/nyc_playground_finder")
            }
          >
            Source Code
          </button>
          <button
            onClick={() =>
              (window.location.href =
                "https://www.linkedin.com/in/rachelleperez/")
            }
          >
            Connect with Author
          </button>
        </section>
      </div>
    </Main>
  );
};

export default About;
