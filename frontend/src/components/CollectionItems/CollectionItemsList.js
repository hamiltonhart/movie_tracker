import React, { useState } from "react";
import { CollectionItem } from "./CollectionItem";
import { movieSortingABC } from "../../utilities";

import { LabelStyle, TextInputStyle } from "../styles/Forms";

export const CollectionItemsList = ({ items, collectionId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listItems, setListItems] = useState(movieSortingABC(items));

  const handleSearch = (e) => {
    const searchArray = [];
    const tempSearchTerm = e.target.value;
    items.map((item) => {
      const compTitle = item.movie.titlePrefix
        ? `${item.movie.titlePrefix} ${item.movie.title}`
        : item.movie.title;
      compTitle.toLowerCase().includes(tempSearchTerm.toLowerCase()) &&
        searchArray.push(item);
    });
    setSearchTerm(tempSearchTerm);
    setListItems(searchArray);
  };

  return (
    <div>
      <LabelStyle htmlFor="movieListSearchTitle" hidden>
        Movie Title
      </LabelStyle>
      <TextInputStyle
        type="search"
        id="movieListSearchTitle"
        value={searchTerm}
        onChange={(e) => handleSearch(e)}
        placeholder="Search List"
      />
      {listItems.map((item) => (
        <CollectionItem key={item.id} item={item} collectionId={collectionId} />
      ))}
    </div>
  );
};
