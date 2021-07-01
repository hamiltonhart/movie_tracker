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
  mutation createPlantItem(
    $plantId: Int
    $name: String!
    $sciName: String
    $types: String
    $location: String
  ) {
    createPlantItem(
      plantId: $plantId
      name: $name
      sciName: $sciName
      types: $types
      location: $location
    ) {
      plantItem {
        id
        location
        plant {
          id
          name
          sciName
          types {
            id
            typeLabel
          }
        }
      }
    }
  }
`;
