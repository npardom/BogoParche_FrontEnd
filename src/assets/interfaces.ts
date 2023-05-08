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
  horario_plan: string
}

export interface Comment {
  id_comentario: number,
  id_usuario: number,
  id_actividad: number,
  texto_comentario: string,
  calificacion: number,
  createdAt: Date,
}