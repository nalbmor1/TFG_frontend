import { RouteResponse } from '../types/routeTypes';

export const mockRouteResponse: RouteResponse = {
  routes: [
    {
      path: [
        [39.4699, -0.3763],
        [39.4710, -0.3740],
        [39.4725, -0.3755],
        [39.4730, -0.3780],
        [39.4715, -0.3795],
        [39.4700, -0.3780],
        [39.4699, -0.3763], 
      ],
      length: 5200,
      length_deviation: 0.08,
      bikepath: 0.8499,
      crossings: 0.53,
      pollution: 0.25,
      hypervolume: 0.92,
    },
    {
      path: [
        [39.4699, -0.3763],
        [39.4705, -0.3730],
        [39.4730, -0.3735],
        [39.4740, -0.3760],
        [39.4720, -0.3785],
        [39.4700, -0.3770],
        [39.4699, -0.3763],
      ],
      length: 5500,
      length_deviation: 0.1,
      bikepath: 1.000000,
      crossings: 0.250,
      pollution: 0.32,
      hypervolume: 0.85,
    },
    {
      path: [
        [39.4699, -0.3763],
        [39.4685, -0.374],
        [39.47, -0.372],
        [39.472, -0.373],
        [39.4725, -0.3755],
        [39.471, -0.3775],
        [39.4699, -0.3763],
      ],
      length: 4800,
      length_deviation: 0.07,
      bikepath: 0.812647,
      crossings: 0.543,
      pollution: 0.18,
      hypervolume: 0.88,
    },
  ],
  state: 'SUCCESS',
};