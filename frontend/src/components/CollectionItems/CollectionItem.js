import React from "react";

import { DeleteCollectionItem } from "./DeleteCollectionItem";

import { Card } from "../styles/Card";
import { CardMoviePoster } from "../styles/CardMoviePoster";
import { CardMovieText } from "../styles/CardMovieText";
import { CardMovieButtons } from "../styles/CardMovieButtons";
import { PrimaryButton } from "../styles/Buttons";
import { CardMovieContent } from "../styles/CardMovieContent";
import imageNotAvailable from "../../images/NoImageAvailable.svg";
import { useToggle } from "../utilities";

export const CollectionItem = ({ item, collectionId }) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";
  const TMDB_PATH = "https://www.themoviedb.org/movie/";

  const { isShowing, toggle } = useToggle();

  return (
    // <Paper className={classes.root}>
    <Card onClick={toggle} expanded={isShowing}>
      <CardMovieContent>
        <CardMoviePoster
          src={
            item.movie.picPath
              ? `${POSTER_PATH}${item.movie.picPath}`
              : imageNotAvailable
          }
          alt={item.movie.title}
          squared={isShowing}
        />
        <CardMovieText>
          <div className="movieTitle">
            <h3>
              {item.movie.titlePrefix
                ? `${item.movie.titlePrefix} ${item.movie.title}`
                : `${item.movie.title}`}{" "}
            </h3>
            <p className="movieDate">{`(${item.movie.releaseYear})`}</p>
          </div>
          <div>
            <p>
              {`${item.movie.summary.slice(0, 180)}${
                item.movie.summary.length > 125 ? "..." : ""
              }`}
            </p>
          </div>
        </CardMovieText>
      </CardMovieContent>
      {isShowing && (
        <CardMovieButtons>
          <div>
            <DeleteCollectionItem
              id={item.id}
              title={item.movie.title}
              collectionId={collectionId}
            />
            <PrimaryButton
              as="a"
              href={`${TMDB_PATH}${item.movie.tmdbId}`}
              target="_blank"
            >
              More Info
            </PrimaryButton>
          </div>
        </CardMovieButtons>
      )}
    </Card>
    // </Paper>
  );
};
