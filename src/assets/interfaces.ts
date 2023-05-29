export interface Activity {
  id: number,
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
  horario_plan: string,
  es_privada: boolean,
  image: string,
  users: string[],
  owned: boolean
}

export interface Comment {
  id_comentario: number,
  username: string,
  id_actividad: number,
  texto_comentario: string,
  calificacion: number,
  created_at: Date,
  owned: boolean
}