import React from "react";
import logo from "../assets/logo.png";
// import Bg from "../assets/Bg.jpg";
import card1 from "../assets/card1.png";
import { Button } from "react-bootstrap";
import Navbar from '../components/Navbar'
import './Header.css'

function Header() {
  return (
    <>

    <Navbar className='nav'/>

<section className="d-flex justify-content-around align-items-center border border-danger">

      {/* //card 1 */}
      <div className="card1 bg-secondary p-5">
        <img src={card1} alt="" width={350} height={300} />
        <div className="positioned">
          <p>MediGuard</p>
          <img src={logo} alt="" width={30} height={30} />
        </div>
      </div>

      {/* //card 2 */}
      <div className="card2 bg-warning p-2" style={{width:"400px",height:"230px"}}>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
          laborum eos beatae est voluptatibus deleniti placeat dolore
          necessitatibus eligendi? Quidem impedit eveniet aliquid est voluptas
          dicta veritatis rem qui, laboriosam obcaecati molestias, dolorem
          facilis?
        </p>
        <Button>Contact Us</Button>
      </div>
</section>
      
    </>
  );
}

export default Header;
