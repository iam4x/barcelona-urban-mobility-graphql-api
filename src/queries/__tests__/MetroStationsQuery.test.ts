import { createTestClient } from "apollo-server-testing";
import { gql } from "apollo-server-lambda";
import createTestServer from "../../utils/createTestServer";

import { mockMetroStationsAPIResponse } from "../../datasources/__fixtures__/MetroStationsFixtures";

const GET_METRO_STATIONS = gql`
  query getMetroStations($first: Int) {
    metroStations(first: $first) {
      stations {
        edges {
          node {
            lines
            name
          }
        }
      }
    }
  }
`;

describe("metroStations Query", () => {
  it("Fetches list of metro stations", async () => {
    const { server, metro } = createTestServer();
    metro.get = jest.fn().mockReturnValueOnce(mockMetroStationsAPIResponse);

    const { query } = createTestClient(server);
    const res = await query({
      query: GET_METRO_STATIONS,
      variables: { first: 2 },
    });

    expect(res).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "metroStations": Object {
            "stations": Object {
              "edges": Array [
                Object {
                  "node": Object {
                    "lines": Array [
                      "L10N",
                    ],
                    "name": "La Salut",
                  },
                },
                Object {
                  "node": Object {
                    "lines": Array [
                      "L5",
                    ],
                    "name": "Camp de l'Arpa",
                  },
                },
              ],
            },
          },
        },
        "errors": undefined,
        "extensions": undefined,
        "http": Object {
          "headers": Headers {
            Symbol(map): Object {},
          },
        },
      }
    `);
  });
});
