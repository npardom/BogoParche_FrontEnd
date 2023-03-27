import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Catalogue from './pages/catalogue';
import Parches from './pages/parches';
import SugerirActividad from './pages/sugerirActividad';
import InfoActividad from './pages/infoActividad';
import EditarActividad from './pages/editarActividad';
import AñadirActividad from './pages/añadirActividad';
import AboutUs from './pages/aboutUs';
import Login from './pages/login';
import SignUp from './pages/signUp';
import YouNeedToRegister from './components/YouNeedToRegister';
import {Navigate} from 'react-router-dom';

export function App() {

  const loggedInUser = localStorage.getItem("username");

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
        <Route path="/parches" element={
          loggedInUser ? (
            <Parches />
          ) : (
            <Navigate replace to={"/"} />
          )
        } />
        <Route path="/sugerirActividad" element={
          loggedInUser ? (
            <SugerirActividad />
          ) : (
            <Navigate replace to={"/"} />
          )
        } />
        <Route path="/añadirActividad" 
        element={
          loggedInUser ? (
            <AñadirActividad />
          ) : (
            <Navigate replace to={"/"} />
          )
        } />
        <Route path="/acercaDe" element={<AboutUs />} />
        <Route path="/login" 
        element={
          !loggedInUser ? (
            <Login />
          ) : (
            <Navigate replace to={"/"} />
          )
        }/>
        <Route path="/signUp" 
        element={
          !loggedInUser ? (
            <SignUp />
          ) : (
            <Navigate replace to={"/"} />
          )
        }/>
        <Route path="/actividades/:slug" element = {<InfoActividad />}/>
        <Route path="/editarActividad/:slug" element={
          loggedInUser ? (
            <EditarActividad />
          ) : (
            <Navigate replace to={"/"} />
          )
        } />
      </Routes>
      <Footer />
    </Router>
  );
}
