import React from 'react';
import'./SectionAboutMe.css';

const SectionAboutMe = () => {
    return (
    <section  id="section_1" class="about_me">

      <div class="profile-container"><img class="profile" src="./asset/images/pfp2.jpg" /></div>
      <div class="info">
      <h1>about me </h1>
      <div class="info_degree">
        <div class="DUT">
          <br />
          <span><img src="./asset/images/education.png" style={{height: '60px', marginLeft: '10px', marginTop: '-1px', position: 'relative'}}></img></span>
          <h2>DUT</h2>
          <p>2023</p>
        </div>
        <div class="BS">
          <span><img src="asset/images/diplome.png" style={{height: '60px', marginLeft: '10px', marginTop: '20px', position: 'relative'}}></img></span>
          <h2>B.S</h2>
          <p>2024</p>
        </div>

      </div>
      
    <div class="info_text">
      <p> Web Developer with 3 years of using Java and PHP and their frameworks - Javascript, React, Python , blender.
        Developed over 11 websites from scratch at Siteground, improved security by 25%, and attracted 500K new customers to SportsBet
        after developing & implementing new data-driven features. Seeking opportunity to leverage front-end & back-end skills and increase customer
        engagement at Hopper.</p>
    </div>
      <div class="dowload">
        <button id="downloadCV"> download CV</button>
    
      </div>
    </div>
   
    <span><a href="#section_2"> <img class="down" src="asset/down.png" style={{height: '40px', marginTop: '380px', marginRight: '-200px'}} alt="" />  </a></span>
  </section>
    );
};

export default SectionAboutMe;