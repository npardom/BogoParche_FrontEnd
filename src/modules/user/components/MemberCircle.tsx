function MemberCircle({ name, color }: { name: string; color: string }) {
   const s: React.CSSProperties = {
    backgroundColor:  color,
    color:"white",
    textShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
    width: "85px",
  };

  return (
    <div style = {s} className="memberCircle">
      {name}
    </div>
  );
}

export default MemberCircle;