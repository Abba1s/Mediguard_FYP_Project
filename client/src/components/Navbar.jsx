import React from "react";
import { Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import About from "../components/About";
import Support from "../components/Support";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

// import Bg from "../assets/Bg.jpg";
import card1 from "../assets/card1.png";
import "./Header.css";

function Navbar() {

  const navigate = useNavigate();
  return (
    //Navbar
    <>
      <div className="main" id="home">
        <nav className="d-flex justify-content-around pt-5 pb-2">
          <div className="d-flex ">
            <h3 className="mx-2 fw-bold text-light">MediGuard</h3>
            <img src={logo} alt="" width={30} height={30} />
          </div>
          <div>
            <ul className="d-flex justify-content-center">
              <li className="list-group-item mx-4 fw-bold text-light">
                <a
                  className="list-group-item mx-4 fw-bold text-light"
                  href="#home"
                >
                  Home
                </a>
              </li>
              {/* <Link   to="about"> About  </Link> */}

              <li>
               
                <a
                  className="list-group-item mx-4 fw-bold text-light"
                  href="#about"
                >
                  About
                </a>
              </li>
              <li>
               
               <a
                 className="list-group-item mx-4 fw-bold text-light"
                 href="#support"
               >
                 Support
               </a>
             </li>
            </ul>
          </div>
          <div>
            <Button className="mx-5 btn fw-bold my_button" variant="secondary"
            onClick={()=>{
              navigate("/mediguard/dashboard/medicine/verify")
            }}>
              Verify
           
            </Button>
            <Button
              style={{
                backgroundColor: "#071341",
                outline: "none",
                border: "none",
              }}
              className="fw-bold my_button" onClick={()=>{
                navigate("/mediguard/login")
              }}
            >
              Login
            </Button>
          </div>
        </nav>
        {/* // Header Section */}
        <section
          
          className="d-flex justify-content-around align-items-center"
          style={{ height: "75vh" }}
        >
          {/* //card 1 */}
          <div className="card1 p-5 rounded-3 d-flex justify-content-center align-items-center">
            <img
              src={card1}
              alt=""
              width={370}
              height={350}
              className="rounded-3"
            />
            <div className="positioned">
              <p className="fw-bold">MediGuard</p>
              <img src={logo} alt="" width={35} height={35} />
            </div>
          </div>

          {/* //card 2 */}
          <div
            className="card2 p-3 text-light rounded-3 mt-5"
            style={{ width: "400px", height: "230px" }}
          >
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
              laborum eos beatae est voluptatibus deleniti placeat dolore
              necessitatibus eligendi? Quidem impedit eveniet aliquid est
              voluptas dicta veritatis rem qui, laboriosam obcaecati molestias,
              dolorem facilis?
            </p>
            <Button className="fw-bold px-3"> <a href="#support" className="text-lights" style={{textDecoration:'none',color:'white'}}>Contact Us</a> </Button>
          </div>
        </section>
      </div>

      <h3 className="text-light text-center fw-bold my-5" id="about">
        About
      </h3>
  
      <About />

      <h3 className="text-light text-center fw-bold my-5" id="support">
        Support And Assistance
      </h3>
      <Support />

      <Footer />
    </>
  );
}

export default Navbar;
