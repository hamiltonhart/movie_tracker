import React, { useState } from "react";
import { CollectionItem } from "./CollectionItem";
import { movieSortingABC } from "../../utilities";

import { makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  searchField: {
    marginBottom: theme.spacing(2),
  },
}));

export const CollectionItemsList = ({ items, collectionId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listItems, setListItems] = useState(movieSortingABC(items));

  const handleSearch = (e) => {
    const searchArray = new Array();
    const tempSearchTerm = e.target.value;
    items.map((item) => {
      item.movie.title.toLowerCase().includes(tempSearchTerm.toLowerCase()) &&
        searchArray.push(item);
    });
    setSearchTerm(tempSearchTerm);
    setListItems(searchArray);
  };

  const classes = useStyles();

  return (
    <div>
      <TextField
        className={classes.searchField}
        fullWidth
        variant="outlined"
        value={searchTerm}
        onChange={(e) => handleSearch(e)}
        placeholder="Search Collection"
      />
      {listItems.map((item) => (
        <CollectionItem key={item.id} item={item} collectionId={collectionId} />
      ))}
    </div>
  );
};
