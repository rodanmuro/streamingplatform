import React from "react";
import './Reproductor.css';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import YouTube from 'react-youtube';

import apiConfig from '../../api/apiTMDb/apiConfig';
import InfoBanner from '../infobanner/InfoBanner';

const Reproductor = ({ alquiladas }) => {
  const movie = useSelector((state) => state.movie.value);

  const [playing, setPlaying] = useState(false);
  const [trailer, setTrailer] = useState(false);

  useEffect(() => {
    if (movie.videos && movie.videos.results) {
      const trailer = movie.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : movie.videos.results[0]);
    }
  }, [movie]);

  const updatePlaying = () => setPlaying(true);

  return (
    <>
      <main className="seccion-reproductor">
        {movie ? (
          <div className={ `viewtrailer ${ !trailer || alquiladas.length == 0 ? 'd-none' : 'd-flex'} `}>
            <img src={ `${apiConfig.URL_IMAGE}${movie.backdrop_path}` } className={ !trailer || alquiladas.length == 0 ? 'd-none' : 'd-block'} /> 
            {playing ? (
              <>
                <YouTube
                  videoId={trailer.key}
                  className="reproductor"
                  containerClassName={"youtube-container amru"}
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      cc_load_policy: 0,
                      fs: 0,
                      iv_load_policy: 0,
                      modestbranding: 0,
                      rel: 0,
                      showinfo: 0,
                    },
                  }}
                />
                <button onClick={() => setPlaying(false)} className="boton btn-cerrar">
                  Close
                </button>
              </>
            ) : ( <InfoBanner movie={movie} trailer={trailer} alquiladas={alquiladas} HandlerUpdatePlaying={ (state) => updatePlaying } /> )}
          </div>
        ) : null}
      </main>
    </>
  );
};

export default Reproductor;
