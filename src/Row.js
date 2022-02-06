import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow }) {
  // here we pass the special condition "is large row" that added to larger icons as an argumetnt.
  const [movies, setMovies] = useState([]);
  // a snippet of code which runs based on a specific condition, this time when a row load , use effect will run
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    // if [], run once when row loads, and dont run again,
    // if [movies], it will run when movies changing.
    // in this case we need to add fetchUrl to there, then it will re render whyl fetch url changing
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  /* all the time when we using in the use effect that outside the block we need to give it as a dependencie to this [] s*/

  // this is the options for the YouTube
  const opts1 = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    // on user click on the poster handle click will run.
    if (trailerUrl) {
      // first if there is a trailer url, clicking is stop playing it.
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "") // movieTraile is comming from the package we installed, it is imported above
        .then((url) => {
          // id of a youtube video is coming after v= in the url, here is how to filter it out.
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error)); //this block acts as a promise, so if there is an error we can see what that is.
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            className={`row_poster ${isLargeRow && "row_posterLarge"} `}
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path // here we add use poster path if originals or trending
            }`} // use backdrop path for others, according to islargerow conditon.
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts1} />}
    </div>
  );
}

export default Row;
