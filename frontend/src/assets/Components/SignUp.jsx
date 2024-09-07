import React from 'react';
import './SignUp.css'; // Ensure the styles are applied

const SignUp = ({ signIn, setSignIn, signUp, setSignUp, title }) => {
  return (
    <div className="modal-overlay">
      <div className="signin-section">
        <h2>{title}</h2>
        <form className="signin-form">
          {title === "Sign Up" ? (
            <input type="text" placeholder="Enter Full Name" required />
          ) : null}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="signin-submit-btn">{title}</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setSignIn(false);
              setSignUp(false);
            }}
            className="signin-close-btn"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
