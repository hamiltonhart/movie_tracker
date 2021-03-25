import { gql } from "apollo-boost";

// Queries
export const GET_COLLECTION_ITEM = gql`
  query collectionItem($id: Int!) {
    collectionItem(id: $id) {
      id
      comments
      id
      comments
      movie {
        id
        tmdbId
        title
        titlePrefix
        summary
        releaseYear
        picPath
      }
    }
  }
`;

// Mutations

export const CREATE_COLLECTION_ITEM = gql`
  mutation createCollectionItem(
    $movieCollectionId: Int!
    $tmdbId: Int
    $title: String!
    $summary: String
    $releaseYear: Int
    $picPath: String
    $comments: String
  ) {
    createCollectionItem(
      movieCollectionId: $movieCollectionId
      tmdbId: $tmdbId
      title: $title
      summary: $summary
      releaseYear: $releaseYear
      picPath: $picPath
      comments: $comments
    ) {
      collectionItem {
        id
        comments
        movie {
          id
          tmdbId
          title
          titlePrefix
          summary
          releaseYear
          picPath
        }
      }
    }
  }
`;

export const UPDATE_COLLECTION_ITEM = gql`
  mutation updateCollectionItem($id: Int!, $comments: String) {
    updateCollectionItem(id: $id, comments: $comments) {
      collectionItem {
        id
        comments
        movie {
          id
          tmdbId
          title
          titlePrefix
          summary
          imdbId
          releaseYear
          picPath
        }
      }
    }
  }
`;

export const DELETE_COLLECTION_ITEM = gql`
  mutation deleteCollectionItem($id: Int!) {
    deleteCollectionItem(id: $id) {
      id
    }
  }
`;
