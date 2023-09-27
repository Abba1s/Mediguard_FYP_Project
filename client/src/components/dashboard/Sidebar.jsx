import React, { useState, useEffect } from "react";
import admin from "../../assets/admin.png";
import { BiPlusMedical } from "react-icons/bi";
import { CgTrack } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";
import drug from "../../assets/drug.png";

function Sidebar() {
  const [role, setRole] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("role"));
    setRole(role);
  }, []);
  return (
    <>
      <div className="sidebar text-light">
        {/* HEADER LOGO */}
        <div className="Header">
          {/*  */}
          <div className="d-flex align-items-center justify-content-center flex-column">
            <h1 className="logo">ADMIN</h1>
            <img
              src={admin}
              width={100}
              className="rounded-3"
              alt="Admin Pic"
            />
          </div>
        </div>

        {/* LINKS SECTION */}
        <div className="d-flex flex-column Links">
          {/* <div className="d-flex flex-column"> */}

          {(() => {
            if (role === "admin") {
              return (
                <div className="d-flex flex-column">
                  <div className="d-flex item">
                    <BiPlusMedical className="plus" />
                    <Link
                      className="Link"
                      to={"/mediguard/dashboard/user/supp"}
                    >
                      Raw Supplier
                    </Link>
                  </div>
                  <div className="d-flex item">
                    <BiPlusMedical className="plus" />
                    <Link className="Link" to={"/mediguard/dashboard/user/man"}>
                      Manufacturer
                    </Link>
                  </div>
                  <div className="d-flex item">
                    <BiPlusMedical className="plus" />
                    <Link
                      className="Link"
                      to={"/mediguard/dashboard/user/dist"}
                    >
                      Distributor
                    </Link>
                  </div>
                  <div className="d-flex item">
                    <BiPlusMedical className="plus" />
                    <Link className="Link" to={"/mediguard/dashboard/user/ret"}>
                      Retailer
                    </Link>
                  </div>
                  <div className="d-flex item">
                    <BiPlusMedical className="plus" />
                    <Link
                      className="Link"
                      to={"/mediguard/dashboard/user/order"}
                    >
                      Order Medicine
                    </Link>
                  </div>
                </div>
              );
            }
          })()}

          {/* __________________Added___________ */}

          {/* ________________Supply___________ */}
          {(() => {
            if (role === "supplier") {
              return (
                <div className="d-flex flex-column">
                  <div className="d-flex item">
                    <BiPlusMedical className="plus" />
                    <Link
                      className="Link"
                      to={"/mediguard/dashboard/supplier/supply"}
                    >
                      Supply
                    </Link>
                  </div>
                </div>
              );
            }
          })()}
          {/* ________________Manufacture___________ */}
          {(() => {
            if (role === "manufacturer") {
              return (
                <div className="d-flex flex-column">
                  <div className="d-flex item">
                    <BiPlusMedical className="plus" />
                    <Link
                      className="Link"
                      to={"/mediguard/dashboard/manufacturer/manufacture"}
                    >
                      Manufacture
                    </Link>
                  </div>
                </div>
              );
            }
          })()}

          {/* ________________Distribute___________ */}

          {(() => {
            if (role === "distributor") {
              return (
                <div className="d-flex flex-column">
                  <div className="d-flex item">
                    <BiPlusMedical className="plus" />
                    <Link
                      className="Link"
                      to={"/mediguard/dashboard/distributer/distribute"}
                    >
                      Distribute
                    </Link>
                  </div>
                </div>
              );
            }
          })()}
          {/* ________________Retailer___________ */}
          {(() => {
            if (role === "retailer") {
              return (
                <div className="d-flex flex-column">
                  <div className="d-flex item">
                    <BiPlusMedical className="plus" />
                    <Link
                      className="Link"
                      to={"/mediguard/dashboard/retailer/retail"}
                    >
                      Retail
                    </Link>
                  </div>
                </div>
              );
            }
          })()}


          {/* ___________________________________________________- */}

          {/* </div> */}

          <div className="track_all mt-4">
            <div className="d-flex flex-column">
              <div className="d-flex item">
                <BiPlusMedical className="plus" />
                <Link
                  className="Link"
                  to={"/mediguard/dashboard/medicine/track"}
                >
                  Track Medicine
                </Link>
                {/* <p className="link">Track Medicine</p> */}
                <CgTrack className="track" />
              </div>
              <div className="d-flex item">
                <BiPlusMedical className="plus" />
                <Link className="Link" to={"/mediguard/dashboard/medicine/all"}>
                  All Medicines
                </Link>
                {/* <p className="link">All Medicines</p> */}
                <img
                  src={drug}
                  className="drug"
                  width={30}
                  height={30}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* LOGOUT SECTION  */}
        <div className="Logout">
          <h5
            className="log item"
            onClick={() => {
              localStorage.removeItem("role");
              navigate("/");
            }}
          >
            Log Out
          </h5>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
