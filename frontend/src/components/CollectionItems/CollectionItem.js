import React from "react";

import { makeStyles, Typography, Paper, Button } from "@material-ui/core";

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

export const CollectionItem = ({ item }) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";
  const TMDB_PATH = "https://www.themoviedb.org/movie/";
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.imageTitle}>
        <img
          src={`${POSTER_PATH}${item.movie.picPath}`}
          alt={item.movie.title}
        />
        <div className={classes.title}>
          <Typography variant="h6">{`${item.movie.title}`} </Typography>
          <Typography variant="h6">{item.movie.releaseYear}</Typography>

          <div className={classes.buttonContainer}>
            <Button
              as="a"
              href={`${TMDB_PATH}${item.movie.tmdbId}`}
              target="_blank"
              variant="outlined"
              fullWidth
            >
              More Info
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Typography variant="body1">{`${item.movie.summary}`}</Typography>
      </div>
    </Paper>
  );
};
