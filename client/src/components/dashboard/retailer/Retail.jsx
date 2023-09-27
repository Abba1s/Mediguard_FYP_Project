import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "../../../contracts/SupplyChain.json";
import { Button } from "react-bootstrap";
import Sidebar from "../Sidebar";
import LoaderComp from "../LoaderComp"
// import './table.css'
function Retail() {
  const navigate = useNavigate();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedStage, setMedStage] = useState();
  const [ID, setID] = useState();

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
    setloader(true);
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
        med[i] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);
      setloader(false);
    } else {
      window.alert("The smart contract is not deployed to current network");
    }
  };
  if (loader) {
    return (
      <div className="d-flex align-items-center justify-content-center flex-column vh-100">
      <LoaderComp/>
     <h1 className="wait">Loading...</h1>
 </div>
    );
  }
  const redirect_to_home = () => {
    navigate("/");
  };
  const handlerChangeID = (event) => {
    setID(event.target.value);
  };
  const handlerSubmitRetail = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Retail(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  const handlerSubmitSold = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .sold(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
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
            style={{ width: "60vw", height: "88vh" }}
          >
            <div
              className="header bg-dark text-light d-flex align-items-center justify-content-center"
              style={{ height: "25vh", borderRadius: "5px 5px 0px 0px" }}
            >
              <h3>Retailing The Medicine</h3>
            </div>

            <div
              className="section d-flex flex-column justify-content-center align-items-center"
              style={{ height: "53vh" }}
            >
              <h4 className="text-center fw-bold">Enter Medicine ID</h4>
              <div className="input_file d-flex align-items-center">
                <input
                  className=" my-3 bg-secondary rounded-3 p-1"
                  type="number"
                  onChange={handlerChangeID}
                />
                <input className="d-none" type="file" />
              </div>
              <Button onClick={handlerSubmitRetail} className="row col-3">
                Retail Medicine
              </Button>
              <div className="input_file d-flex align-items-center">
                <input
                  className=" my-3 bg-secondary rounded-3 p-1"
                  type="number"
                  onChange={handlerChangeID}
                />
                <input className="d-none" type="file" />
              </div>
              <Button onClick={handlerSubmitSold} className="row col-3">
                Sell Medicine
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Retail;
