import React, { useEffect } from 'react';
import './SectionAboutMe.css';

const SectionAboutMe = ({Lang}) => {

  const HandelCV = () => {
    const selectedLanguage = Lang;
  
    let fileUrl;
    let fileName;
    if (selectedLanguage === "en") {
      fileUrl = './asset/cv_en.pdf';
      fileName = 'IliasJebraneCV_EN.pdf';
    }
     else if (selectedLanguage === "fr") {
      fileUrl = './asset/cv_fr.pdf';
      fileName = 'IliasJebraneCV_FR.pdf';
    } 

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="section_1" className="about_me">
      <div className="profile-container">
        <img className="profile" src="./asset/images/pfp2.jpg" />
      </div>
      <div className="info">
        <h1>about me</h1>
        <div className="info_degree">
          <div className="DUT">
            <br />
            <span>
              <img src="./asset/images/education.png" style={{ height: '60px', marginLeft: '10px', marginTop: '-1px', position: 'relative' }} />
            </span>
            <h2>DUT</h2>
            <p>2023</p>
          </div>
          <div className="BS">
            <span>
              <img src="asset/images/diplome.png" style={{ height: '60px', marginLeft: '10px', marginTop: '20px', position: 'relative' }} />
            </span>
            <h2>B.S</h2>
            <p>2024</p>
          </div>
        </div>
        <div className="info_text">
          <p>
            Web Developer with 3 years of using Java and PHP and their frameworks - Javascript, React, Python, blender.
            Developed over 11 websites from scratch at Siteground, improved security by 25%, and attracted 500K new customers to SportsBet
            after developing & implementing new data-driven features. Seeking opportunity to leverage front-end & back-end skills and increase customer
            engagement at Hopper.
          </p>
        </div>
        <div className="dowload">
          <button onClick={HandelCV}>download CV</button>
        </div>
      </div>
      <span>
        <a href="#section_2">
          <img className="down" src="./asset/images/down.png" style={{ height: '40px', marginTop: '380px', marginRight: '-800px' }} alt="" />
        </a>
      </span>
    </section>
  );
};

export default SectionAboutMe;