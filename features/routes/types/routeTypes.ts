export interface RouteRequest {
  lat: number;
  lon: number;
  distance: number;
}

export interface RouteInfo {
  path: [number, number][];
  length: number;
  length_deviation: number;
  bikepath: number;
  crossings: number;
  pollution: number;
  hypervolume: number;
}

export interface RouteResponse {
  routes: RouteInfo[];
  state: string;
}

export interface TaskResponse {
  task_id: string;
}