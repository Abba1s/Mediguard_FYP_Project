import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Web3 from "web3";
import SupplyChainABI from "../contracts/SupplyChain.json";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import logo from "../assets/logo.png"

function Verify() {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null);
  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState();
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedStage, setMedStage] = useState();
  const [RMS, setRMS] = useState();
  const [MAN, setMAN] = useState();
  const [DIS, setDIS] = useState();
  const [RET, setRET] = useState();
  const [TrackTillSold, showTrackTillSold] = useState(false);
  const [TrackTillRetail, showTrackTillRetail] = useState(false);
  const [TrackTillDistribution, showTrackTillDistribution] = useState(false);
  const [TrackTillManufacture, showTrackTillManufacture] = useState(false);
  const [TrackTillRMS, showTrackTillRMS] = useState(false);
  const [TrackTillOrdered, showTrackTillOrdered] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 10,
    });

    let isScanning = true;

    scanner.render(success, error);

    function success(result) {
      if (isScanning) {
        scanner.clear();
        setScanResult(result);
        isScanning = false; // Set isScanning to false to stop further scanning
      }
    }

    function error(err) {
      console.warn(err);
    }

    loadWeb3();
    loadBlockchaindata();
  },[]);

  // _______________________Added Scanner______________



  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  const loadBlockchaindata = async () => {
    // setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
      const supplychain = new web3.eth.Contract(
        SupplyChainABI.abi,
        networkData.address
      );
      setSupplyChain(supplychain);
      var i;
      const medCtr = await supplychain.methods.medicineCtr().call();
      const med = {};
      const medStage = [];
      for (i = 0; i < medCtr; i++) {
        med[i + 1] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i + 1] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);
      const rmsCtr = await supplychain.methods.rmsCtr().call();
      const rms = {};
      for (i = 0; i < rmsCtr; i++) {
        rms[i + 1] = await supplychain.methods.RMS(i + 1).call();
      }
      setRMS(rms);
      const manCtr = await supplychain.methods.manCtr().call();
      const man = {};
      for (i = 0; i < manCtr; i++) {
        man[i + 1] = await supplychain.methods.MAN(i + 1).call();
      }
      setMAN(man);
      const disCtr = await supplychain.methods.disCtr().call();
      const dis = {};
      for (i = 0; i < disCtr; i++) {
        dis[i + 1] = await supplychain.methods.DIS(i + 1).call();
      }
      setDIS(dis);
      const retCtr = await supplychain.methods.retCtr().call();
      const ret = {};
      for (i = 0; i < retCtr; i++) {
        ret[i + 1] = await supplychain.methods.RET(i + 1).call();
      }
      setRET(ret);
      setloader(false);
    } else {
      window.alert("The smart contract is not deployed to current network");
    }
  };
  // if (loader) {
  //   return (
  //     <div className="d-flex align-items-center justify-content-center flex-column vh-100">
  //       <LoaderComp />
  //       <h1 className="wait">Loading...</h1>
  //     </div>
  //   );
  // }

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  if (TrackTillSold) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[scanResult].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[scanResult].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[scanResult].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[scanResult]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Raw Materials Supplied by:</u>
            </h4>
            <p>
              <b>Supplier ID: </b>
              {RMS[MED[scanResult].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[scanResult].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[scanResult].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Manufactured by:</u>
            </h4>
            <p>
              <b>Manufacturer ID: </b>
              {MAN[MED[scanResult].MANid].id}
            </p>
            <p>
              <b>Name:</b> {MAN[MED[scanResult].MANid].name}
            </p>
            <p>
              <b>Place: </b>
              {MAN[MED[scanResult].MANid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Distributed by:</u>
            </h4>
            <p>
              <b>Distributor ID: </b>
              {DIS[MED[scanResult].DISid].id}
            </p>
            <p>
              <b>Name:</b> {DIS[MED[scanResult].DISid].name}
            </p>
            <p>
              <b>Place: </b>
              {DIS[MED[scanResult].DISid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Retailed by:</u>
            </h4>
            <p>
              <b>Retailer ID: </b>
              {RET[MED[scanResult].RETid].id}
            </p>
            <p>
              <b>Name:</b> {RET[MED[scanResult].RETid].name}
            </p>
            <p>
              <b>Place: </b>
              {RET[MED[scanResult].RETid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Sold</u>
            </h4>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillSold(false);
            setScanResult();
          }}
          className="btn btn-success btn-sm"
        >
          Track Another
        </button>
        <span
          onClick={() => {
            navigate("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          {" "}
          HOME
        </span>
      </div>
    );
  }
  if (TrackTillRetail) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[scanResult].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[scanResult].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[scanResult].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[scanResult]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Raw Materials Supplied by:</u>
            </h4>
            <p>
              <b>Supplier ID: </b>
              {RMS[MED[scanResult].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[scanResult].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[scanResult].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Manufactured by:</u>
            </h4>
            <p>
              <b>Manufacturer ID: </b>
              {MAN[MED[scanResult].MANid].id}
            </p>
            <p>
              <b>Name:</b> {MAN[MED[scanResult].MANid].name}
            </p>
            <p>
              <b>Place: </b>
              {MAN[MED[scanResult].MANid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Distributed by:</u>
            </h4>
            <p>
              <b>Distributor ID: </b>
              {DIS[MED[scanResult].DISid].id}
            </p>
            <p>
              <b>Name:</b> {DIS[MED[scanResult].DISid].name}
            </p>
            <p>
              <b>Place: </b>
              {DIS[MED[scanResult].DISid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Retailed by:</u>
            </h4>
            <p>
              <b>Retailer ID: </b>
              {RET[MED[scanResult].RETid].id}
            </p>
            <p>
              <b>Name:</b> {RET[MED[scanResult].RETid].name}
            </p>
            <p>
              <b>Place: </b>
              {RET[MED[scanResult].RETid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillRetail(false);
            setScanResult();
          }}
          className="btn btn-success btn-sm"
        >
           Track Another
        </button>
        <span
          onClick={() => {
            navigate("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          {" "}
          HOME
        </span>
      </div>
    );
  }
  if (TrackTillDistribution) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[scanResult].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[scanResult].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[scanResult].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[scanResult]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Raw Materials Supplied by:</u>
            </h4>
            <p>
              <b>Supplier ID: </b>
              {RMS[MED[scanResult].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[scanResult].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[scanResult].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Manufactured by:</u>
            </h4>
            <p>
              <b>Manufacturer ID: </b>
              {MAN[MED[scanResult].MANid].id}
            </p>
            <p>
              <b>Name:</b> {MAN[MED[scanResult].MANid].name}
            </p>
            <p>
              <b>Place: </b>
              {MAN[MED[scanResult].MANid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Distributed by:</u>
            </h4>
            <p>
              <b>Distributor ID: </b>
              {DIS[MED[scanResult].DISid].id}
            </p>
            <p>
              <b>Name:</b> {DIS[MED[scanResult].DISid].name}
            </p>
            <p>
              <b>Place: </b>
              {DIS[MED[scanResult].DISid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillDistribution(false);
            setScanResult();
          }}
          className="btn btn-success btn-sm"
        >
          Track Another
        </button>
        <span
          onClick={() => {
            navigate("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          {" "}
          HOME
        </span>
      </div>
    );
  }
  if (TrackTillManufacture) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[scanResult].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[scanResult].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[scanResult].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[scanResult]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Raw Materials Supplied by:</u>
            </h4>
            <p>
              <b>Supplier ID: </b>
              {RMS[MED[scanResult].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[scanResult].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[scanResult].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Manufactured by:</u>
            </h4>
            <p>
              <b>Manufacturer ID: </b>
              {MAN[MED[scanResult].MANid].id}
            </p>
            <p>
              <b>Name:</b> {MAN[MED[scanResult].MANid].name}
            </p>
            <p>
              <b>Place: </b>
              {MAN[MED[scanResult].MANid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillManufacture(false);
            setScanResult();
          }}
          className="btn btn-success btn-sm"
        >
           Track Another
        </button>
        <span
          onClick={() => {
            navigate("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          {" "}
          HOME
        </span>
      </div>
    );
  }
  if (TrackTillRMS) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[scanResult].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[scanResult].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[scanResult].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[scanResult]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Raw Materials Supplied by:</u>
            </h4>
            <p>
              <b>Supplier ID: </b>
              {RMS[MED[scanResult].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[scanResult].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[scanResult].RMSid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillRMS(false);
            setScanResult("");
          }}
          className="btn btn-success btn-sm"
        >
           Track Another
        </button>
        <span
          onClick={() => {
            navigate("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          {" "}
          HOME
        </span>
      </div>
    );
  }
  if (TrackTillOrdered) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Medicine:</u>
            </b>
          </h3>
          <span>
            <b>Medicine ID: </b>
            {MED[scanResult].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[scanResult].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[scanResult].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[scanResult]}
          </span>
          <hr />
          <br />
          <h5>Medicine Not Yet Processed...</h5>
          <button
            onClick={() => {
              showTrackTillOrdered(false);
              setScanResult("");
            }}
            className="btn btn-success btn-sm"
          >
            Track Another
          </button>
          <span
            onClick={() => {
              navigate("/");
            }}
            className="btn btn-outline-danger btn-sm"
          >
            {" "}
            HOME
          </span>
        </article>
      </div>
    );
  }

  const redirect_to_home = () => {
    navigate("/");
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    var ctr = await SupplyChain.methods.medicineCtr().call();
    console.log(scanResult);
    if (!(scanResult > 0 && scanResult <= ctr))
      toast.error(
        "Wrong Id : Medicine ID doesn't Exist please Enter the correct Id",
        toastOptions
      );
    else {
      // eslint-disable-next-line
      if (MED[scanResult].stage == 5) showTrackTillSold(true);
      // eslint-disable-next-line
      else if (MED[scanResult].stage == 4) showTrackTillRetail(true);
      // eslint-disable-next-line
      else if (MED[scanResult].stage == 3) showTrackTillDistribution(true);
      // eslint-disable-next-line
      else if (MED[scanResult].stage == 2) showTrackTillManufacture(true);
      // eslint-disable-next-line
      else if (MED[scanResult].stage == 1) showTrackTillRMS(true);
      else showTrackTillOrdered(true);
    }
  };

  return (
    <>
    <nav className="d-flex justify-content-around pt-5 pb-2" style={{backgroundColor:"#6C63F5"}}>
          <div className="d-flex ">
            <h3 className="mx-2 fw-bold text-dark">MediGuard</h3>
            <img src={logo} alt="" width={30} height={30} />
          </div>
          <div>
            <ul className="d-flex justify-content-center">
              <li className="list-group-item mx-4 fw-bold text-dark">
                <a
                  className="list-group-item mx-4 fw-bold text-dark"
                  href="/"
                >
                  Home
                </a>
              </li>
              {/* <Link   to="about"> About  </Link> */}

              <li>
               
                <a
                  className="list-group-item mx-4 fw-bold text-dark"
                  href="/"
                >
                  About
                </a>
              </li>
              <li>
               
               <a
                 className="list-group-item mx-4 fw-bold text-dark"
                 href="/"
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
      <div className="d-flex align-items-center justify-content-center" style={{height:"100vh"}}>

        <div
          className="menu d-flex justify-content-center"
          style={{ width: "75vw" }}
        >
          <div
            className="border border-dark rounded-3"
            style={{ width: "60vw", height: "auto" }}
          >
            <div
              className="header bg-dark text-light d-flex align-items-center justify-content-center"
              style={{ height: "25vh", borderRadius: "5px 5px 0px 0px" }}
            >
              <h3>Tracking The Medicine</h3>
            </div>

            <div
              className="section d-flex flex-column justify-content-center align-items-center"
              style={{ height: "auto" }}
            >
              <h1>QR Scanning Code</h1>
              {scanResult ? (
                <div>
                  <Button onClick={handlerSubmit}>Success:{scanResult}</Button>

                  <p>Medicine ID: {scanResult}</p>
                </div>
              ) : (
                <div>
                  <div id="reader"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Verify;
