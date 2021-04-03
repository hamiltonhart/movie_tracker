import React, { useState, useContext } from "react";

import { CollectionContext } from "../../pages/CollectionPage";

import { CollectionItem } from "./CollectionItem";
import { movieSortingABC } from "../../utilities";

import { LabelStyle, TextInputStyle } from "../styles/Forms";
import { FlexContainer, GridContainer } from "../styles/Containers";

export const CollectionItemsList = () => {
  const context = useContext(CollectionContext);

  const [rerender, setRerender] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [listItems, setListItems] = useState(
    movieSortingABC(context.collectionItems)
  );

  const handleSearch = (e) => {
    const searchArray = [];
    const tempSearchTerm = e.target.value;
    context.collectionItems.map((item) => {
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
              rerenderList={handleRerender}
            />
          ))}
        </GridContainer>
      </FlexContainer>
    </div>
  );
};
