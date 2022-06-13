import { useQuery } from "@apollo/client";
import { QUERY_GET_LOCATIONS } from "../util/queries";

export function useUserLocation() {
  const getUserLocation = useQuery(QUERY_GET_LOCATIONS);
  const getLocation = async (location) => {
    try {
      if (!location) {
        throw new Error("No users with that location");
      }
      return await getUserLocation({ variables: { location } });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(getLocation);
  return getLocation;
}
