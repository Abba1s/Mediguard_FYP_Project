import { Button } from "react-bootstrap";
import React from "react";
// import './table.css'
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

function OptRetailer() {
  const navigate = useNavigate();
  return (
    <>



<div className="d-flex align-items-center">
        <Sidebar />

        <div
          className="menu d-flex justify-content-center"
          style={{ width: "75vw" }}
        >

<div
        className=" border border-dark rounded-3"
        style={{ width: "60vw", height: "88vh" }}
      >
        <div
          className="header bg-dark text-light d-flex align-items-center justify-content-center"
          style={{ height: "25vh", borderRadius: "5px 5px 0px 0px" }}
        >
          <h3>Retailer</h3>
        </div>

        <div className="section d-flex flex-column row justify-content-center align-items-center" style={{height:'53vh'}}>
                        <Button className='col-4' onClick={()=>{
                          navigate("/mediguard/dashboard/user/ret/opt/add")
                        }}>
                            New Retailer
                        </Button>


                        <Button className='col-4 my-4' onClick={()=>{
                          navigate("/mediguard/dashboard/user/ret/opt/all")
                        }}>
                            All Retailers
                        </Button>
                </div>

      </div>

        </div>
      </div>





      
    </>
  );
}

export default OptRetailer;
