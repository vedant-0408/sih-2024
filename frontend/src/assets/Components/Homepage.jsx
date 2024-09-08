import React, { useState } from 'react';
import BotHindi from './BotHindi'; // Import BotHindi component
import Bot from './Bot'; // Import BotEnglish component
import './Homepage.css'; // Import external CSS
import SignUp from './SignUp'; // Import SignUp component
import Footer from './Footer';
import bot from '../chat-bot-icon-1-259.webp'

const Homepage = () => {
  const [isBotStarted, setIsBotStarted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hindi'); // Default language is English
  const [signUp, setSignUp] = useState(0);
  const [signIn, setSignIn] = useState(0);

  const handleStartBot = () => {
    setIsBotStarted(true);
  };

  const handleLanguageSwitch = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">ExploreBot</div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        {/* <div className="auth-links">
          <button className="signin-btn" onClick={() => { setSignUp(0); setSignIn(1); }}>Sign In</button>
          <button className="signup-btn" onClick={() => { setSignIn(0); setSignUp(1); }}>Sign Up</button>
        </div> */}
      </nav>

      {/* Main Content */}
      <div className="homepage-container">
        <div className="homepage-content">
        <header className={`homepage-header ${isBotStarted ? "blur-background" : ""}`}>
            <h1>Welcome to ExploreBot!</h1>
            <p>Your Personalized Guide to College Admissions in Rajasthan</p>
        </header>

          <section className={`homepage-description`}>
            <p className= {`${isBotStarted ? "blur-background" : ""}`}>
              Are you a student looking for the best college options in Rajasthan? Unsure about courses, cutoffs, or admission processes? CollegeCounselBot is here to help!
            </p>
            <ul className= {`${isBotStarted ? "blur-background" : ""}`}>
              <li><strong>Find Your Dream College:</strong> Get personalized recommendations based on your preferences and academic background.</li>
              <li><strong>Know the Admissions Process:</strong> Stay up-to-date on application deadlines, eligibility, and cutoff marks.</li>
              <li><strong>Explore Courses:</strong> Learn about various courses offered by Rajasthan's leading institutions, from engineering to arts and everything in between.</li>
            </ul>

            {!isBotStarted ? (
              <button className="start-btn" onClick={handleStartBot}>
                Start Asking Now!!
                <div className='start-options'>
                  <span className='material-symbols-outlined'>content_copy</span>
                  <span className="material-symbols-outlined">mic</span>
                  <span id="send-btn" className="material-symbols-outlined">send</span>
                </div>
              </button>
            ) : (
              <div>
                {selectedLanguage === 'english' ? <Bot isBotStarted={isBotStarted} setIsBotStarted={setIsBotStarted} selectedLanguage={selectedLanguage}  setSelectedLanguage={setSelectedLanguage} /> : <BotHindi isBotStarted={isBotStarted} setIsBotStarted={setIsBotStarted} selectedLanguage={selectedLanguage}  setSelectedLanguage={setSelectedLanguage} />}
              </div>
            )}
          </section>
        </div>
        {/* SignIn/SignUp Modals */}
        {/* {signIn ? <SignUp title={"Sign In"} signIn={signIn} setSignIn={setSignIn} signUp={signUp} setSignUp={setSignUp} /> : null}
        {signUp ? <SignUp title={"Sign Up"} signIn={signIn} setSignIn={setSignIn} signUp={signUp} setSignUp={setSignUp} /> : null} */}
        {/* <span className="homepage-content-boot">
        </span> */}
            <img src={bot} alt="hello"></img>
      </div>
      
      {/* <Footer /> */}
    </div>
  );
};

export default Homepage;
