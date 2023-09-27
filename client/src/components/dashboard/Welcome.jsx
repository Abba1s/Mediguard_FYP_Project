import React, { useState,useEffect } from "react";
import admin from "../../assets/admin.png";
import Sidebar from "./Sidebar";

function Welcome() {

  const [role, setRole] = useState();

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("role"));
    setRole(role);
  }, []);


  return (
    <>
      <div className="d-flex align-items-center">
        <Sidebar />

        <div
          className="menu d-flex justify-content-center"
          style={{ width: "75vw" }}
        >
          <div
            className="border bg-dark text-light border-dark rounded-3 d-flex flex-column justify-content-center align-items-center"
            style={{ width: "60vw", height: "88vh" }}
          >
            <h2>Welcome to {role} Dashboard!</h2>
            <img
              src={admin}
              alt="admin logo"
              width={300}
              className="rounded-3 mt-5"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
