import { gql } from "apollo-boost";

export const GET_ALL_PLANTS = gql`
  query getAllPlants {
    plants {
      id
      name
    }
  }
`;

export const GET_PLANT = gql`
  query getPlant($id: Int!) {
    plant(id: $id) {
      id
      name
      sciName
      wateringInstructions
      comments
      types {
        typeLabel
      }
      plants {
        id
        location
      }
    }
  }
`;

// Mutations
export const CREATE_PLANT_ITEM = gql`
  mutation createPlantItem($plantId: Int!, $location: String!) {
    createPlantItem(plantId: $plantId, location: $location) {
      plantItem {
        id
        location
      }
    }
  }
`;

export const CREATE_PLANT = gql`
  mutation createPlant(
    $name: String!
    $sciName: String
    $types: String!
    $location: String!
  ) {
    createPlant(
      name: $name
      sciName: $sciName
      types: $types
      location: $location
    ) {
      plant {
        id
        name
        sciName
        comments
        wateringInstructions
        plants {
          id
          location
        }
        types {
          id
          typeLabel
        }
      }
    }
  }
`;

export const UPDATE_PLANT = gql`
  mutation updatePlant(
    $id: Int!
    $name: String
    $sciName: String
    $types: String
    $deleteItems: [Int]
    $comments: String
    $plants: [[String]]
    $wateringInstructions: String
  ) {
    updatePlant(
      id: $id
      name: $name
      sciName: $sciName
      types: $types
      deleteItems: $deleteItems
      comments: $comments
      plants: $plants
      wateringInstructions: $wateringInstructions
    ) {
      plant {
        id
        name
        sciName
        comments
        wateringInstructions
        plants {
          id
          location
        }
        types {
          id
          typeLabel
        }
      }
    }
  }
`;
