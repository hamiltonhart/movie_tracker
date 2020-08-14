import React from "react";
import { CollectionItem } from "./CollectionItem";

export const CollectionItemsList = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <CollectionItem key={item.id} item={item} />
      ))}
    </div>
  );
};
