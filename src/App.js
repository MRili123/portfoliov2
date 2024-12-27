
import './App.css';
import Welcome from './comp/welcome/SectionWelcome';
import About from './comp/aboutme/SectionAboutMe';
import Projects from './comp/SectionProjects';
import Contact from './comp/SectionContacts';
import Nav from './comp/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Nav/>
     <Welcome /> 
       <About />
      {/* <Projects /> */}
      {/* <Contact /> */}   
    </div>
  );
}

export default App;




