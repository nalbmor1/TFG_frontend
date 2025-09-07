import { BASE_URL } from '@env';
import { RouteRequest, RouteResponse, TaskResponse } from '../types/routeTypes';

export async function solicitarGeneracionRutas(data: RouteRequest): Promise<TaskResponse> {
  const response = await fetch(`${BASE_URL}/routes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al solicitar generación de ruta');
  return response.json();
}

export async function obtenerResultadoRuta(taskId: string): Promise<RouteResponse> {
  const response = await fetch(`${BASE_URL}/routes/result/${taskId}`);
  if (!response.ok) throw new Error('Error al obtener resultado de la ruta');
  return response.json();
}