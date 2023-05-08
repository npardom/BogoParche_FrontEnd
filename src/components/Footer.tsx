import milhojasLogo from "../assets/logos/milhojasLogo.png";

function Footer() {
  return (
    <div className="footer">
      <div className="footerText">Creado por</div>
      <img src={milhojasLogo} className="milhojasLogo" />
    </div>
  );
}

export default Footer;
