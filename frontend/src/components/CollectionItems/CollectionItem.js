import React from "react";

import { DeleteCollectionItem } from "./DeleteCollectionItem";

import { makeStyles, Typography, Paper, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[6],
  },
  imageTitle: {
    display: "flex",
  },
  image: {
    alignSelf: "start",
  },
  titleHeading: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    marginLeft: theme.spacing(1),
  },
  title: {
    lineHeight: "1",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export const CollectionItem = ({ item, collectionId }) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";
  const TMDB_PATH = "https://www.themoviedb.org/movie/";
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.imageTitle}>
        <img
          className={classes.image}
          src={`${POSTER_PATH}${item.movie.picPath}`}
          alt={item.movie.title}
        />
        <div className={classes.titleHeading}>
          <Typography className={classes.title} variant="h6">
            {`${item.movie.title}`}{" "}
          </Typography>
          <Typography variant="subtitle1">{item.movie.releaseYear}</Typography>
          <div className={classes.buttonContainer}>
            <DeleteCollectionItem
              id={item.id}
              title={item.movie.title}
              collectionId={collectionId}
            />
            <Button
              as="a"
              href={`${TMDB_PATH}${item.movie.tmdbId}`}
              target="_blank"
              variant="contained"
              fullWidth
            >
              More Info
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  );
};
