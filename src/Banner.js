import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./requests";
import "./banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals); // request const is the list of netflix originals.
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str; // this function will limit the number of character to display from an string
  }

  const bannerStyle = {
    backgroundImage: `url(
      https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
  };

  return (
    <header className="banner" style={bannerStyle}>
      <div className="banner_content">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* sometimes movie name is coming in titile, name or original_name this code will reply to any format */}
        {/* also by using ? after movie, it works as an if, if movie do not comeout for some reason , code still runs even without banner */}

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <h2 className="banner_description">{truncate(movie?.overview, 150)}</h2>
      </div>
      <div className="this_is_for_fade_effect"></div>
    </header>
  );
}

export default Banner;
