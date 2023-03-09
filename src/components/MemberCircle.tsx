import {useState} from "react";

function MemberCircle({ name, color }: { name: string; color: string }) {
  const [isHover, setIsHover] = useState(false);

   const handleMouseEnter = () => {
      setIsHover(true);
   };
   const handleMouseLeave = () => {
      setIsHover(false);
   };

   const s: React.CSSProperties = {
    backgroundColor: isHover ? "white": color,
    color: isHover ? "black": "white",
    textShadow: isHover ? "none": "0px 0px 5px rgba(0, 0, 0, 0.5)",
    width: isHover ? "80px":"85px",
  };

  return (
    <div style={s} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="memberCircle">
      {name}
    </div>
  );
}

export default MemberCircle;