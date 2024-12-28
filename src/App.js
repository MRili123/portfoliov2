
import './App.css';
import React, { useState } from 'react';
import Welcome from './comp/welcome/SectionWelcome';
import About from './comp/aboutme/SectionAboutMe';
import Projects from './comp/SectionProjects';
import Contact from './comp/SectionContacts';
import Nav from './comp/navbar/Navbar';

function App() {
  const [lang, SetLang] = useState("");
  console.log(lang);
  return (
    
    <div className="App">
      <Nav sendLang ={SetLang}/>
     <Welcome /> 
       <About  Lang={lang}/>
      {/* <Projects /> */}
      {/* <Contact /> */}   
    </div>
  );
}

export default App;




