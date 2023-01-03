import React from "react";

const InfoBanner = ({ trailer, movie, alquiladas, HandlerUpdatePlaying }) => {

  return (
    <div className="container pb-3">
      <div className="pb-0 pb-sm-5">
        {trailer ? (
          <button
            className="boton mb-4"
            onClick={ HandlerUpdatePlaying() }
            type="button"
          >
            Play Trailer
          </button>
        ) : '' }
        <h1 className="text-black pb-3">{movie.title}</h1>
        <p className="text-black">{movie.overview}</p>
      </div>
    </div>
  );
};

export default InfoBanner;
