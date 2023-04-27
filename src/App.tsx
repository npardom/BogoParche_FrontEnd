// Importing packages for routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// Importing components
import Header from "./components/Header";
import Footer from "./components/Footer";
import YouNeedToRegister from './components/YouNeedToRegister';
// Importing editor-only pages
import EditarActividad from './modules/editor/pages/editarActividad';
import AñadirActividad from './modules/editor/pages/añadirActividad';
import AdministrarSugerencias from './modules/editor/pages/administrarSugerencias';
import InfoSuggestion from './modules/editor/pages/infoSuggestion';
// Importing normal pages
import AboutUs from './modules/user/pages/aboutUs';
import Login from './modules/user/pages/login';
import SignUp from './modules/user/pages/signUp';
import Catalogue from './modules/user/pages/catalogue';
import Parches from './modules/user/pages/parches';
import SugerirActividad from './modules/user/pages/sugerirActividad';
import InfoActividad from './modules/user/pages/infoActividad';

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
    </Router>
  );
}
