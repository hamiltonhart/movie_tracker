import React from "react";
import { CreateCollectionItem } from "../CollectionItems";

import { makeStyles, Typography, Paper, Button } from "@material-ui/core";
import { SecondaryButton } from "../styles/Buttons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  imageTitle: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  title: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    marginLeft: theme.spacing(1),
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

const MovieSearchListItem = ({ collectionId, movie, toggle }) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";
  const TMDB_PATH = "https://www.themoviedb.org/movie/";
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.imageTitle}>
        <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
        <div className={classes.title}>
          <Typography variant="h6">{`${movie.title}`} </Typography>
          <Typography variant="h6">
            {movie.release_date && `(${movie.release_date.slice(0, 4)})`}
          </Typography>

          <CreateCollectionItem
            movieCollectionId={collectionId}
            title={movie.title}
            tmdbId={movie.id}
            summary={movie.overview}
            picPath={movie.poster_path}
            releaseYear={
              movie.release_date ? movie.release_date.slice(0, 4) : 0
            }
            toggle={toggle}
          />
          <SecondaryButton
            as="a"
            href={`${TMDB_PATH}${movie.id}`}
            target="_blank"
            fullwidth
          >
            More Info
          </SecondaryButton>
        </div>
      </div>
      <div>
        <Typography variant="body1">{`${movie.overview}`}</Typography>
      </div>
    </Paper>
  );
};

export default MovieSearchListItem;
