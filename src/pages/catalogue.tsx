import {useState, useEffect} from "react";

function Catalogue() {
  const [dato, setDato] = useState(null);

  useEffect(() => {
    console.log(
    fetch("/api")
      .then((res) => res.json())
      .then((dato) => setDato(dato.data)));
  }, []);

  return (
    <div>{!dato ? "Loading..." : dato}</div>
  )
}

export default Catalogue