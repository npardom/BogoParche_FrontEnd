function MemberCircle({name, color}: {name: string, color: string}) {
  return (
    <div style= {{backgroundColor: color, textShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)"}} className = "memberCircle">{name}</div>
  )
}

export default MemberCircle