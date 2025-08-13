import { RouteResponse } from '../types/routeTypes';

export const mockRouteResponse: RouteResponse = {
  routes: [
    {
      path: [
        [39.4699, -0.3763],
        [39.4705, -0.3750],
        [39.4710, -0.3740],
      ],
      length: 2.1,
      length_deviation: 0.05,
      bikepath: 1.5,
      crossings: 2,
      pollution: 0.2,
      hypervolume: 0.9,
    },
    {
      path: [
        [39.4699, -0.3763],
        [39.4700, -0.3770],
        [39.4712, -0.3780],
      ],
      length: 2.2,
      length_deviation: 0.07,
      bikepath: 1.2,
      crossings: 3,
      pollution: 0.3,
      hypervolume: 0.85,
    },
    {
      path: [
        [39.4699, -0.3763],
        [39.4695, -0.3755],
        [39.4700, -0.3745],
      ],
      length: 2.0,
      length_deviation: 0.03,
      bikepath: 1.0,
      crossings: 1,
      pollution: 0.1,
      hypervolume: 0.8,
    },
  ],
  state: 'SUCCESS',
};