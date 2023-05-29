// Importing packages
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
// Importing components and pages
import { Header,Footer,YouNeedToRegister, EditActivity, AddActivity,ManageSuggestions, InfoSuggestion, AboutUs, Login, SignUp, Catalogue, Parches, CreateParche, SuggestActivity, InfoActivity} from "./imports";
import { loggedInUser, isAdmin,getCategoriesName } from './assets/functionsAndConstants';

export function App() {
  // Function for rendering the pop-up for signing up
  function RegisterPopUp (){
    if (!loggedInUser()){
      return <YouNeedToRegister/>
    }else{
      return <></>
    }
  }

  // Gets all the categories from the database
  useEffect(() => {
    getCategoriesName();
  }, []);

  return (
    <Router>
      <div className="cloudContainer1" id ="clouds1"></div>
      <div className="cloudContainer2" id ="clouds2"></div>
      <Header />
      <RegisterPopUp/>
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/parches" element={loggedInUser() ? <Parches/>:<Navigate replace to={"/"}/>} />
        <Route path="/crearParche" element={loggedInUser() ? <CreateParche/>:<Navigate replace to={"/"}/>} />
        <Route path="/sugerirActividad" element={loggedInUser() ? <SuggestActivity/>:<Navigate replace to={"/"}/>} />
        <Route path="/añadirActividad" element={isAdmin() ? <AddActivity/> : <Navigate replace to={"/"}/>} />
        <Route path="/acercaDe" element={<AboutUs />} />
        <Route path="/login" element={!loggedInUser() ? <Login />:<Navigate replace to={"/"} />} />
        <Route path="/signUp" element={!loggedInUser() ? <SignUp />: <Navigate replace to={"/"} />} />
        <Route path="/actividades/:slug" element = {<InfoActivity />}/>
        <Route path="/editarActividad/:slug" element={loggedInUser() ? <EditActivity />: <Navigate replace to={"/"}/>} />
        <Route path="/administrarSugerencias" element={isAdmin() ? <ManageSuggestions/>:<Navigate replace to={"/"}/>} />
        <Route path="/sugerencia/:slug" element={isAdmin() ? <InfoSuggestion/>:<Navigate replace to={"/"}/>} />
      </Routes>
      <Footer />
      <div className="mountainContainer" id ="mountain1"></div>
      <div className="mountain2Container" id ="mountain2"></div>
      <div className="citySkylineContainer" id ="citySkyline"></div>
    </Router>
  );
} 
