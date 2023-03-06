import icon from "../assets/icons/infoIcon.png";
import logoUNAL from "../assets/logoUNAL.png";
import MemberCircle from "../components/MemberCircle";

function AboutUs() {
  return (
    <div className="aboutUsCard">
      <div className="aboutUsContainer">
        <div className="pageTitle">
          <img src={icon} className="pageTitleIcon" />
          <div className="pageTitleText">Sobre Nosotros</div>
        </div>
        <div className="aboutUsBox">
          <img src={logoUNAL} className="iconUNAL" />
          <div className="verticalLine"></div>
          <div className="aboutUsText">
            Somos el grupo Milhojas. Un equipo de estudiantes de la Universidad
            Nacional de Colombia.
          </div>
        </div>
        <div className="integrantes">Integrantes</div>
        <div className="horizontalLine"></div>
        <div className="memberCirclesArray">
          <MemberCircle name="Daniela Tocua" color="rgba(237,135,198,0.63)" />
          <MemberCircle name="Diana Monroy" color="rgba(214,164,235,0.63)" />
          <MemberCircle
            name="Juan Diego Cortes"
            color="rgba(121,73,198,0.63)"
          />
          <MemberCircle
            name="Esteban Umbarila"
            color="rgba(125,220,250,0.63)"
          />
          <MemberCircle
            name="Johann Maldonado"
            color="rgba(125,220,250,0.63)"
          />
          <MemberCircle name="Nicolas Pardo" color="rgba(20,171,219,0.63)" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
