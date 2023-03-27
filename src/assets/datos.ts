export interface Activity {
  id_actividad: number,
  titulo_actividad: string,
  ubicacion: string,
  id_categoria: number,
  rango_precio: string,
  descripcion: string,
  restriccion_edad: boolean,
  medio_contacto: string,
  es_plan:boolean,
  fecha_inicio: string,
  fecha_fin: string,
  hora_inicio: string,
  hora_fin: string,
  horario_plan: string
}

export const pricesList = [
  "Gratis",
  "1k - 10k",
  "10k - 50k",
  "50k - 100k",
  "100k - 150k",
  "+150k",
];