import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Sidebar from "../Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Web3 from "web3";
import SupplyChainABI from "../../../contracts/SupplyChain.json";
import { useNavigate } from "react-router-dom";


function Menu() {


  const navigate = useNavigate();
  
  const [ID, setID] = useState();
  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState();
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedStage, setMedStage] = useState();

  useEffect(() => {
   
    loadWeb3();
    loadBlockchaindata();
  }, [ID]);

  // _______________________Added Scanner______________

  const [RMS, setRMS] = useState();
  const [MAN, setMAN] = useState();
  const [DIS, setDIS] = useState();
  const [RET, setRET] = useState();
  const [TrackTillSoldID, showTrackTillSoldID] = useState(false);
  const [TrackTillRetailID, showTrackTillRetailID] = useState(false);
  const [TrackTillDistributionID, showTrackTillDistributionID] = useState(false);
  const [TrackTillManufactureID, showTrackTillManufactureID] = useState(false);
  const [TrackTillRMSID, showTrackTillRMSID] = useState(false);
  const [TrackTillOrderedID, showTrackTillOrderedID] = useState(false);
  

 

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

  

  if (TrackTillSoldID) {
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
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
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
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Manufactured by:</u>
            </h4>
            <p>
              <b>Manufacturer ID: </b>
              {MAN[MED[ID].MANid].id}
            </p>
            <p>
              <b>Name:</b> {MAN[MED[ID].MANid].name}
            </p>
            <p>
              <b>Place: </b>
              {MAN[MED[ID].MANid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Distributed by:</u>
            </h4>
            <p>
              <b>Distributor ID: </b>
              {DIS[MED[ID].DISid].id}
            </p>
            <p>
              <b>Name:</b> {DIS[MED[ID].DISid].name}
            </p>
            <p>
              <b>Place: </b>
              {DIS[MED[ID].DISid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Retailed by:</u>
            </h4>
            <p>
              <b>Retailer ID: </b>
              {RET[MED[ID].RETid].id}
            </p>
            <p>
              <b>Name:</b> {RET[MED[ID].RETid].name}
            </p>
            <p>
              <b>Place: </b>
              {RET[MED[ID].RETid].place}
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
            showTrackTillSoldID(false);
            setID()
          }}
          className="btn btn-outline-success btn-sm"
        >
          Go back to tracking
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
  if (TrackTillRetailID) {
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
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
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
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Manufactured by:</u>
            </h4>
            <p>
              <b>Manufacturer ID: </b>
              {MAN[MED[ID].MANid].id}
            </p>
            <p>
              <b>Name:</b> {MAN[MED[ID].MANid].name}
            </p>
            <p>
              <b>Place: </b>
              {MAN[MED[ID].MANid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Distributed by:</u>
            </h4>
            <p>
              <b>Distributor ID: </b>
              {DIS[MED[ID].DISid].id}
            </p>
            <p>
              <b>Name:</b> {DIS[MED[ID].DISid].name}
            </p>
            <p>
              <b>Place: </b>
              {DIS[MED[ID].DISid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Retailed by:</u>
            </h4>
            <p>
              <b>Retailer ID: </b>
              {RET[MED[ID].RETid].id}
            </p>
            <p>
              <b>Name:</b> {RET[MED[ID].RETid].name}
            </p>
            <p>
              <b>Place: </b>
              {RET[MED[ID].RETid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillRetailID(false);
            setID()
          }}
          className="btn btn-outline-success btn-sm"
        >
          Go back to tracking
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
  if (TrackTillDistributionID) {
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
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
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
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Manufactured by:</u>
            </h4>
            <p>
              <b>Manufacturer ID: </b>
              {MAN[MED[ID].MANid].id}
            </p>
            <p>
              <b>Name:</b> {MAN[MED[ID].MANid].name}
            </p>
            <p>
              <b>Place: </b>
              {MAN[MED[ID].MANid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Distributed by:</u>
            </h4>
            <p>
              <b>Distributor ID: </b>
              {DIS[MED[ID].DISid].id}
            </p>
            <p>
              <b>Name:</b> {DIS[MED[ID].DISid].name}
            </p>
            <p>
              <b>Place: </b>
              {DIS[MED[ID].DISid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillDistributionID(false);
            setID()
          }}
          className="btn btn-outline-success btn-sm"
        >
          Track Another Item
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
  if (TrackTillManufactureID) {
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
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
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
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Manufactured by:</u>
            </h4>
            <p>
              <b>Manufacturer ID: </b>
              {MAN[MED[ID].MANid].id}
            </p>
            <p>
              <b>Name:</b> {MAN[MED[ID].MANid].name}
            </p>
            <p>
              <b>Place: </b>
              {MAN[MED[ID].MANid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillManufactureID(false);
            setID()
          }}
          className="btn btn-outline-success btn-sm"
        >
          Go back to tracking
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
  if (TrackTillRMSID) {
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
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
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
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillRMSID(false);
            setID()
          }}
          className="btn btn-outline-success btn-sm"
        >
          Go back to tracking
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
  if (TrackTillOrderedID) {
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
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
          <hr />
          <br />
          <h5>Medicine Not Yet Processed...</h5>
          <button
            onClick={() => {
              showTrackTillOrderedID(false);
              setID()
            }}
            className="btn btn-outline-success btn-sm"
          >
            Go back to tracking
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

  const handlerChangeID = (event) => {
    setID(event.target.value);
  };
  const redirect_to_home = () => {
    navigate("/");
  };
  const handlerIDSubmit = async (event) => {
    event.preventDefault();
    var ctr = await SupplyChain.methods.medicineCtr().call();
    if (!(ID > 0 && ID <= ctr))
      // alert("Invalid Medicine ID!!!");
      toast.error(
        "Wrong Id : Medicine ID doesn't Exist please Enter the correct Id",
        toastOptions
      );
    else {
      // eslint-disable-next-line
      if (MED[ID].stage == 5) showTrackTillSoldID(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 4) showTrackTillRetailID(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 3) showTrackTillDistributionID(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 2) showTrackTillManufactureID(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 1) showTrackTillRMSID(true);
      else showTrackTillOrderedID(true);
    }
  };




  return (
    <>
      <div className="d-flex align-items-center">
        <Sidebar />

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
              <h4 className="text-center fw-bold">Enter Medicine ID</h4>

              <form
                className="input_file d-flex align-items-center"
                style={{ backgroundColor: "transparent" }}
                onSubmit={handlerIDSubmit}
              >
                <input
                  className=" my-3 bg-secondary rounded-3 p-1"
                  type="number"
                  onChange={handlerChangeID}
                />
                <input className="d-none" type="file" />
              </form>

              <Button className="row col-3 my-2"onClick={handlerIDSubmit}>
              
                Search
              </Button>
             
            </div>
            
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Menu;
