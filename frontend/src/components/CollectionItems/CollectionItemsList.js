import React, { useState } from "react";
import { CollectionItem } from "./CollectionItem";
import { movieSortingABC } from "../../utilities";

import { LabelStyle, TextInputStyle } from "../styles/Forms";
import { FlexContainer, GridContainer } from "../styles/Containers";

export const CollectionItemsList = ({ items, collectionId }) => {
  const [rerender, setRerender] = useState(false);
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

  const handleRerender = () => {
    setRerender(!rerender);
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
      <FlexContainer style={{ marginTop: "var(--lgSpacing)" }}>
        <GridContainer>
          {listItems.map((item) => (
            <CollectionItem
              key={item.id}
              item={item}
              collectionId={collectionId}
              rerenderList={handleRerender}
            />
          ))}
        </GridContainer>
      </FlexContainer>
    </div>
  );
};
