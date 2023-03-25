import React from "react";
import { Button } from "react-bootstrap";
import "./infoActividad.css"; // Importar el archivo CSS 

function infoActividad() {
  return (
    <div className="infoBox">
      <h2>Concierto con dua</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="primary" style={{ backgroundColor: "#9453C2", borderRadius: "20px", padding: "10px 20px", border: 0, outline: "none", display: "block", margin: "auto", marginTop: "-10px" }}>
        Editar Actividad
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <Button variant="secondary" style={{ backgroundColor: "#EA899A", borderRadius: "20px", padding: "10px 20px", border: 0, outline: "none", marginLeft: "-40px" }}>
        ◀ Volver
        </Button>
        <Button variant="success" style={{ backgroundColor: "#28A745", borderRadius: "20px", padding: "10px 20px", border: 0, outline: "none", marginRight: "40px" }}>
        ★Añadir a favoritos
        </Button>
      </div>
      <img src="https://www.eluniversal.com.co/binrepository/1050x700/0c0/0d0/none/13704/VWIK/dua-lipa-en-bogota-2_6746783_20220919095846.jpg" alt="Descripcion del evento" />
      <p>Descripción de la actividad</p>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <textarea style={{ backgroundColor: "transparent", color: "#fff", width: "50%", height: "70px", border: "none", textAlign: "center", margin: "auto", marginTop: "20px", resize: "none" }} placeholder="Escribe aquí la descripción de la actividad"></textarea>
      </div>
      <p>¿Que dice la gente?</p>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <Button variant="secondary" style={{ backgroundColor: "#CF010B", borderRadius: "20px", padding: "10px 20px", border: 0, outline: "none",marginLeft: "40px" }}>
        Crear Parche
        </Button>
        <Button variant="success" style={{ backgroundColor: "#FFFFFF", color: "#9453C2", borderRadius: "20px", padding: "10px 20px", border: 0, outline: "none", marginRight: "40px" }}>
        👍 Añadir una reseña
        </Button>

      </div>
    
    </div>
    
  );
}

export default infoActividad;
