import { ValidationError } from "apollo-server-lambda";
import type {
  BikeStation as BikeStationType,
  RootQueryBikeStationArgs as BikeStationQueryArgsType,
} from "../../types";
import BikeStation from "../outputs/BikeStation";
import FindByInput from "../inputs/FindByInput";
import { GraphQLNonNull } from "graphql";

export default {
  type: BikeStation,
  args: {
    findBy: {
      type: new GraphQLNonNull(FindByInput),
    },
  },
  resolve: async (_, args, { dataSources }): Promise<BikeStationType> => {
    const { findBy }: BikeStationQueryArgsType = args;

    if (!findBy.id && !findBy.name) {
      throw new ValidationError(
        "You have to provide either a non empty ID or non empty Name for the bikeStation query"
      );
    }

    return await dataSources.bike.getStation(findBy);
  },
};