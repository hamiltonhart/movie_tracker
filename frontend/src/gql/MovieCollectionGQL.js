import { gql } from "apollo-boost";

// Queries

export const MOVIE_COLLECTIONS = gql`
  query movieCollections {
    movieCollections {
      id
      title
    }
  }
`;

export const MOVIE_COLLECTION = gql`
  query movieCollection($id: Int!) {
    movieCollection(id: $id) {
      id
      title
      movies {
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

// Mutations

export const CREATE_COLLECTION = gql`
  mutation createMovieCollection($title: String!) {
    createMovieCollection(title: $title) {
      movieCollection {
        id
        title
        movies {
          rating
          comments
          movie {
            id
            tmdbId
            summary
          }
        }
      }
    }
  }
`;

export const UPDATE_COLLECTION = gql`
  mutation updateMovieCollection($id: Int!, $title: String) {
    updateMovieCollection(id: $id, title: $title) {
      movieCollection {
        id
        title
        movies {
          rating
          comments
          movie {
            id
            tmdbId
            summary
          }
        }
      }
    }
  }
`;

export const DELETE_COLLECTION = gql`
  mutation deleteMovieCollection($id: Int!) {
    deleteMovieCollection(id: $id) {
      id
    }
  }
`;
