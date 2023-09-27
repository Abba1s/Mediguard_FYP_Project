import React from "react";

function Footer() {
  return (
    <>
      <div className="footer bg-dark text-light py-5">
        <div className="links  d-flex justify-content-around">
          <div className="links1">
            <h5>Useful Links</h5>
            {/* <p>Home</p>
            <p>About</p>
            <p>Support</p>
            <p>Verify</p> */}


            <a className="list-group-item mx-4  text-light" href="#home">Home</a>
            <a className="list-group-item mx-4 text-light" href="#about">About</a>
            <a className="list-group-item mx-4  text-light" href="#support">Support</a>
            <a className="list-group-item mx-4  text-light" href="#">Verify</a>




          </div>
          <div className="links2">
            <h5>Useful Links</h5>
            
            <a className="list-group-item mx-4  text-light" href="/mediguard/login">Login</a>
            <a className="list-group-item mx-4  text-light" href="#home">Back to top</a>
          
          </div>

          <div className="links3">
            <h5>Social Media Accounts</h5>
            <p>WhatsApp</p>
            <p>Facebook</p>
            <p>Instagram</p>
          </div>
        </div>
        <p className="text-center text-light">Copyright ©</p>
      </div>
    </>
  );
}

export default Footer;
