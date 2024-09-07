import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div>
<footer className="footer">
  <div className="footer-container">
    <div className="footer-links">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
     <div className="footer-logo">
      <h3 >ExploreBot</h3>
      {/* <p>Your guide to <br></br>Rajasthan's<br></br> top colleges</p> */}
    </div>
    <div className="footer-social">
      <h4>Follow Us</h4>
      <ul className="social-icons">
        <li><a href="#"><i className="fab fa-facebook"></i></a></li>
        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
      </ul>
    </div>
  </div>
  <div className="footer-bottom">
    <p>&copy; 2024 ExploreBot. All Rights Reserved.</p>
  </div>
</footer>
    </div>
  )
}

export default Footer