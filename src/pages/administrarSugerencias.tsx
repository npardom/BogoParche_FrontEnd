import { showSuggestionCard } from "../assets/datos"
import InformationSuggestion from "../components/InformationSuggestion"

function AdministrarSugerencias() {
  return (
    <>
    <InformationSuggestion/>
    <button onClick={showSuggestionCard}>Mostrar Pop-up</button>
    </> 
  )
}

export default AdministrarSugerencias