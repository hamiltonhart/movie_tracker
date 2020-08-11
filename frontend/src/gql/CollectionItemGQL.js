import { gql } from "apollo-boost";

// Mutations

export const CREATE_COLLECTION_ITEM = gql`
  mutation createCollectionItem(
    $movieCollectionId: Int!
    $tmdbId: Int!
    $title: String
    $summary: String
    $picPath: String
    $comments: String
    $rating: Int
  ) {
    createCollectionItem(
      movieCollectionId: $movieCollectionId
      tmdbId: $tmdbId
      title: $title
      summary: $summary
      picPath: $picPath
      comments: $comments
      rating: $rating
    ) {
      collectionItem {
        id
        movie {
          id
          tmdbId
          title
          summary
          picPath
        }
        comments
        rating
      }
    }
  }
`;

export const UPDATE_COLLECTION_ITEM = gql`
  mutation updateCollectionItem($id: Int!, $comments: String, $rating: Int) {
    updateCollectionItem(id: $id, comments: $comments, rating: $rating) {
      collectionItem {
        id
        movie {
          id
          tmdbId
          title
          summary
          picPath
        }
        comments
        rating
      }
    }
  }
`;

export const DELETE_COLLECTION_ITEM = gql`
  mutation deleteCollectionItem($id: Int!) {
    updateCollectionItem(id: $id) {
      collectionItem {
        id
      }
    }
  }
`;
