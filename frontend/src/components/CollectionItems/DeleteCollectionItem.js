import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_COLLECTION_ITEM } from "../../gql";

export const DeleteCollectionItem = ({ id }) => {
  const [deleteCollectionItem, { error }] = useMutation(DELETE_COLLECTION_ITEM);

  const handleDelete = () => {
    DeleteCollectionItem({ variables: { id } });
  };

  return (
    <div>
      <button onClick={() => handleDelete()}>Delete Item</button>
    </div>
  );
};
