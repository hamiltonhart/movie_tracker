import React from "react";
import { AnimatePresence } from "framer-motion";

import { useToggle } from "../utilities";
import { CollectionCard } from "./CollectionCard";
import { CollectionItemDetail } from "./CollectionItemDetail";

export const CollectionItem = ({ item, collectionId, rerenderList }) => {
  // Used to toggle the expanded card which shows more information. The poster art changes from rounded to squared when expanded
  const { isShowing: isShowingDetail, toggle: toggleDetail } = useToggle();

  return (
    <>
      <CollectionCard
        onClick={toggleDetail}
        titlePrefix={item.movie.titlePrefix}
        title={item.movie.title}
        picPath={item.movie.picPath}
      />

      <AnimatePresence>
        {isShowingDetail && (
          <CollectionItemDetail
            itemId={item.id}
            collectionId={collectionId}
            toggle={toggleDetail}
            rerenderList={rerenderList}
          />
        )}
      </AnimatePresence>
    </>
  );
};
