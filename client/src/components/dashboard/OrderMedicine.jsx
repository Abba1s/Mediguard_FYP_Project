import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-bootstrap"
import Web3 from "web3";
import SupplyChainABI from "../../contracts/SupplyChain.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import LoaderComp from "./LoaderComp.jsx";
import Sidebar from "./Sidebar";

function Order() {
  
  const navigate = useNavigate()
  useEffect(() => {
      loadWeb3();
      loadBlockchaindata();
  }, [])

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedStage, setMedStage] = useState();


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
          const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
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
      }
      else {
          window.alert('The smart contract is not deployed to current network')
      }
  }
  if (loader) {
      return (
          <div className="d-flex align-items-center justify-content-center flex-column vh-100">
               <LoaderComp/>
              <h1 className="wait">Loading...</h1>
          </div>
      )

  }

  const OrderHandler = async (event) => {
      event.preventDefault();
      try {
          var reciept = await SupplyChain.methods.placeOrder().send({ from: currentaccount });
          if (reciept) {
              loadBlockchaindata();
              navigate("/mediguard/dashboard/medicine/all")
          }
      }
      catch (err) {
          alert("An error occured!!!")
      }
  }






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
              <h3>Order Medicine</h3>
            </div>

            <div
              className="section d-flex flex-column row justify-content-center align-items-center"
              style={{ height: "53vh" }}
            >
              <Button className="col-4 my-4" onClick={OrderHandler}>
                Place an Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;