import React from "react";

import imageNotAvailable from "../../images/NoImageAvailable.svg";
import { MoviePosterStyle } from "../styles/CardMoviePoster";
import { MoviePosterContainer } from "../styles/Containers";
import { PosterHeadingStyle } from "../styles/Typography";

export const CollectionCard = ({ onClick, titlePrefix, title, picPath }) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";

  // Used to toggle the expanded card which shows more information.

  return (
    <>
      <MoviePosterContainer role="button" onClick={onClick}>
        <MoviePosterStyle
          src={picPath ? `${POSTER_PATH}${picPath}` : imageNotAvailable}
          alt={title}
        />

        <header className={`${title}-card-heading-small`}>
          <PosterHeadingStyle>
            {titlePrefix ? `${titlePrefix} ${title}` : `${title}`}{" "}
          </PosterHeadingStyle>
        </header>
      </MoviePosterContainer>
    </>
  );
};
