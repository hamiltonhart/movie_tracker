import React from "react";

import imageNotAvailable from "../../images/NoImageAvailable.svg";
import { MoviePosterStyle } from "../styles/CardMoviePoster";
import { MoviePosterContainer } from "../styles/Containers";
import { PosterHeadingStyle } from "../styles/Typography";

export const CollectionCard = ({
  toggleDetail,
  titlePrefix,
  title,
  picPath,
  views,
}) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";

  // Used to toggle the expanded card which shows more information.
  return (
    <>
      <MoviePosterContainer role="button" onClick={toggleDetail}>
        <MoviePosterStyle
          src={picPath ? `${POSTER_PATH}${picPath}` : imageNotAvailable}
          alt={title}
        />
        {views && (
          <p
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "yellow",
              padding: "5px",
              borderTopLeftRadius: "var(--cardBorderRadius)",
              borderBottomRightRadius: "var(--cardBorderRadius)",
            }}
          >
            {views}
          </p>
        )}

        <header className={`${title}-card-heading-small`}>
          <PosterHeadingStyle>
            {titlePrefix ? `${titlePrefix} ${title}` : `${title}`}{" "}
          </PosterHeadingStyle>
        </header>
      </MoviePosterContainer>
    </>
  );
};
