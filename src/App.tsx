import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Catalogue from './pages/catalogue';
import Parches from './pages/parches';
import SugerirActividad from './pages/sugerirActividad';
import AboutUs from './pages/aboutUs';
import Login from './pages/login';

export function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/parches" element={<Parches />} />
        <Route path="/sugerirActividad" element={<SugerirActividad />} />
        <Route path="/acercaDe" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}
