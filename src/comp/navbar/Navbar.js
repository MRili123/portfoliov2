import React, { useState } from "react";
import "./Navbar.css";

const SectionAboutMe = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    label: "English",
    value: "en",
    flag: "./asset/images/uk.jpg",
  });

  const languages = [
    { label: "English", value: "en", flag: "./asset/images/uk.jpg" },
    { label: "Français", value: "fr", flag: "./asset/images/france.jpg" },
  ];

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Language Selector */}
        <div className="language-selector">
          <div className="selected-language">
            <img
              src={selectedLanguage.flag}
              alt={selectedLanguage.label}
              className="flag-icon"
            />
            <span>{selectedLanguage.label}</span>
          </div>
          <ul className="language-dropdown">
            {languages.map((lang) => (
              <li
                key={lang.value}
                onClick={() => handleLanguageChange(lang)}
                className={`dropdown-item ${
                  lang.value === selectedLanguage.value ? "active" : ""
                }`}
              >
                <img src={lang.flag} alt={lang.label} className="flag-icon" />
                {lang.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Navbar Toggler */}
        <div className="navbar-header">
          <button className="navbar-toggler" onClick={toggleMenu}>
            {menuActive ? (
              <h1 className="menu-close">X</h1>
            ) : (
              <>
                <span></span>
                <span></span>
                <span></span>
              </>
            )}
          </button>
        </div>

        {/* Navbar Menu */}
        <div className={`navbar-menu ${menuActive ? "active" : ""}`}>
          <ul className="navbar-nav">
            <li>
              <a href="#section_1" data-lang="about-me">
                About Me
              </a>
            </li>
            <li>
              <a href="#section_2" data-lang="services">
                Services
              </a>
            </li>
            <li>
              <a href="#section_3" data-lang="projects">
                Projects
              </a>
            </li>
            <li>
              <a href="#section_4" data-lang="contact">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SectionAboutMe;
