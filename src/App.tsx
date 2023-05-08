// Importing packages for routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// Importing components and pages
import { Header,Footer,YouNeedToRegister, EditarActividad, AñadirActividad,AdministrarSugerencias, InfoSuggestion, AboutUs, Login, SignUp, Catalogue, Parches, SugerirActividad, InfoActividad} from "./imports";

export function App() {
  // Getting the username (null if not signed up)
  const loggedInUser = localStorage.getItem("username");

  // Function for rendering the pop-up for signing up
  function RegisterPopUp (){
    if (!loggedInUser){
      return <YouNeedToRegister/>
    }else{
      return <></>
    }
  }

  return (
    <Router>
      <div className="cloudContainer1" id ="clouds1"></div>
      <div className="cloudContainer2" id ="clouds2"></div>
      <Header />
      <RegisterPopUp/>
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/parches" element={loggedInUser ? <Parches/>:<Navigate replace to={"/"}/>} />
        <Route path="/sugerirActividad" element={loggedInUser ? <SugerirActividad/>:<Navigate replace to={"/"}/>} />
        <Route path="/añadirActividad" element={loggedInUser ? <AñadirActividad/> : <Navigate replace to={"/"}/>} />
        <Route path="/acercaDe" element={<AboutUs />} />
        <Route path="/login" element={!loggedInUser ? <Login />:<Navigate replace to={"/"} />} />
        <Route path="/signUp" element={!loggedInUser ? <SignUp />: <Navigate replace to={"/"} />} />
        <Route path="/actividades/:slug" element = {<InfoActividad />}/>
        <Route path="/editarActividad/:slug" element={loggedInUser ? <EditarActividad />: <Navigate replace to={"/"}/>} />
        <Route path="/administrarSugerencias" element={loggedInUser ? <AdministrarSugerencias/>:<Navigate replace to={"/"}/>} />
        <Route path="/administrarSugerencia/:slug" element={loggedInUser ? <InfoSuggestion/>:<Navigate replace to={"/"}/>} />
      </Routes>
      <Footer />
      <div className="mountainContainer" id ="mountain1"></div>
      <div className="mountain2Container" id ="mountain2"></div>
      <div className="citySkylineContainer" id ="citySkyline"></div>
    </Router>
  );
}
