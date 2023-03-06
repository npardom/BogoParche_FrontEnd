import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Catalogue from './pages/catalogue';
import Parches from './pages/parches';
import SugerirActividad from './pages/sugerirActividad';
import About from './pages/about';
import SignUp from './pages/signUp';

export function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/parches" element={<Parches />} />
        <Route path="/sugerirActividad" element={<SugerirActividad />} />
        <Route path="/acercaDe" element={<About />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}
