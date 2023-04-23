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

export interface Comment {
  calificacion: string,
  comentario: string,
  usuario: string,
  fecha: string
}

export const pricesList = [
  "Gratis",
  "1k - 10k",
  "10k - 50k",
  "50k - 100k",
  "100k - 150k",
  "+ 150k"
];

export function showPopUp (){
  var element = document.getElementById("registerPopUpBackground") as HTMLDivElement;
  element.classList.add('appeared');
  element = document.getElementById("registerPopUp") as HTMLDivElement;
  element.classList.add('movedDown');
}
<<<<<<< HEAD
=======

export function hidePopUp() {
  var element = document.getElementById("registerPopUpBackground") as HTMLDivElement;
  element.classList.remove('appeared')
  element = document.getElementById("registerPopUp") as HTMLDivElement;
  element.classList.remove('movedDown');
}

export function showComentForm () {
  var element = document.getElementById("commentFormBackground") as HTMLDivElement;
  element.classList.add('appeared')
  var element = document.getElementById("commentForm") as HTMLDivElement;
  element.classList.add("opacityWhole2")
}

export function hideComentForm () {
  var element = document.getElementById("commentFormBackground") as HTMLDivElement;
  element.classList.remove('appeared')
  var element = document.getElementById("commentForm") as HTMLDivElement;
  element.classList.remove("opacityWhole2")
}

export const handleLogout = () => {
  localStorage.clear();
  window.location.reload();
};
>>>>>>> c28b3e8e79908350679f25a6674d25755a49e4c5
