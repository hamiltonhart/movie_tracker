import React from "react";

import { DeleteCollectionItem } from "./DeleteCollectionItem";

import { makeStyles, Typography, Paper, Button } from "@material-ui/core";
import { ScalarLeafsRule } from "graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[6],
  },
  titleHeading: {
    // display: "flex",
    // alignItems: "center",
    "& > *": {
      display: "inline",
    },
  },
  date: {
    marginLeft: theme.spacing(1),
  },
  imageTitle: {
    display: "flex",
  },
  image: {
    alignSelf: "center",
    maxHeight: "130px",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: "1",
    paddingTop: theme.spacing(1),
  },
  title: {
    lineHeight: "1",
  },
  summary: {
    // maxHeight: "120px",
    overflow: "hidden",
    whiteSpace: "normal",
    textOverflow: "ellipsis",
    marginLeft: theme.spacing(1),
  },
  buttonContainer: {
    display: "flex",
    marginTop: theme.spacing(1),
  },
}));

export const CollectionItem = ({ item, collectionId }) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";
  const TMDB_PATH = "https://www.themoviedb.org/movie/";
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.titleHeading}>
        <Typography className={classes.title} variant="h6">
          {`${item.movie.title}`}{" "}
        </Typography>
        <Typography
          className={classes.date}
          variant="subtitle1"
        >{`(${item.movie.releaseYear})`}</Typography>
      </div>
      <div className={classes.body}>
        <div className={classes.imageTitle}>
          <img
            className={classes.image}
            src={`${POSTER_PATH}${item.movie.picPath}`}
            alt={item.movie.title}
          />
          <div>
            <div className={classes.summary}>
              <Typography variant="body1">
                {`${item.movie.summary.slice(0, 145)}${
                  item.movie.summary.length > 125 ? "..." : ""
                }`}
              </Typography>
            </div>
          </div>
        </div>
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
            color="primary"
            variant="outlined"
            fullWidth
          >
            More Info
          </Button>
        </div>
      </div>
    </Paper>
  );
};
