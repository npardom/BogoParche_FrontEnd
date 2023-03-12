import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Catalogue from './pages/catalogue';
import Parches from './pages/parches';
import SugerirActividad from './pages/sugerirActividad';
import AboutUs from './pages/aboutUs';
import Login from './pages/login';
import SignUp from './pages/signUp';
import { Navigate } from 'react-router-dom';

export function App() {

  const loggedInUser = localStorage.getItem("username");

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/parches" element={<Parches />} />
        <Route path="/sugerirActividad" element={<SugerirActividad />} />
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
      </Routes>
      <Footer />
    </Router>
  );
}
