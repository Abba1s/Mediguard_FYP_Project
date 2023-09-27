import { Button } from "react-bootstrap";
import React from "react";
import { useState, useEffect } from "react";
import add from "../../../assets/add.png";
import Sidebar from "../Sidebar";
import Web3 from "web3";
import SupplyChainABI from "../../../contracts/SupplyChain.json"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderComp from "../LoaderComp";


function AddSupplier() {
  const [currentaccount, setCurrentaccount] = useState("");

  const [RMSname, setRMSname] = useState();
  const [RMSaddress, setRMSaddress] = useState();
  const [RMSplace, setRMSplace] = useState();
  const [RMS, setRMS] = useState();
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();


  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };




  const handlerChangeAddressRMS = (event) => {
    setRMSaddress(event.target.value);
  };
  const handlerChangePlaceRMS = (event) => {
    setRMSplace(event.target.value);
  };
  const handlerChangeNameRMS = (event) => {
    setRMSname(event.target.value);
  };
  const handlerSubmitRMS = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addRMS(RMSaddress, RMSname, RMSplace)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
        navigate("/mediguard/dashboard/user/supp/opt/all")
      }
    } catch (err) {
      toast.error("Possible Error: Address not Valid "+ err, toastOptions);
      // alert("An error occured!!!");
    }
  };





  // __________________________//
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      toast.error("Non-Ethereum browser detected. You should consider trying MetaMask!", toastOptions);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);




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
      const rmsCtr = await supplychain.methods.rmsCtr().call();
      const rms = {};
      for (i = 0; i < rmsCtr; i++) {
        rms[i] = await supplychain.methods.RMS(i + 1).call();
      }
      setRMS(rms);  
      setloader(false);
    } else {
      toast.error("The smart contract is not deployed to current network", toastOptions);
  
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


  

  return (
    <>
      {/* BORDER FRAME */}

      <div className="d-flex align-items-center">
        <Sidebar />

        <div
          className="menu d-flex justify-content-center"
          style={{ width: "75vw" }}
        >

<div
        className="border border-dark rounded-3 d-flex"
        style={{ width: "60vw", height: "88vh" }}
      >
        <div
          className="left d-flex flex-column align-items-center justify-content-center"
          style={{ height: "88vh", width: "27vw" }}
        >
          <h4 className="mb-5 bolder">New Supplier</h4>
          <img src={add} alt="Add User" width={350} />
        </div>

        <div
          className="right bg-dark text-light d-flex flex-column align-items-center justify-content-center"
          style={{ height: "88vh", width: "33vw" }}
        >
          <form className="d-flex flex-column justify-content-start align-items-center bg-dark" style={{ width: "30vw" }}
          onSubmit={handlerSubmitRMS}>
            <label>
             <span>
             Name
                </span> 
              <input
                type="text" style={{marginLeft:"20px"}}
                // value={name}
                onChange={handlerChangeNameRMS}
              />
            </label>

            <label>
            <span>
            Location
                </span> 
              
              <input
                type="text"
                // value={name}
                onChange={handlerChangePlaceRMS}
              />
            </label>
            <label>
            <span>
            ETH Add
                </span> 
              <input
                type="text"
                // value={name}
                onChange={handlerChangeAddressRMS}
              />
            </label>
          </form>
          <Button onClick={handlerSubmitRMS}>Add Supplier</Button>
        </div>
      </div>

        </div>
      </div>
      <ToastContainer/>

      <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Place</th>
              <th scope="col">Ethereum Address</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(RMS).map(function (key) {
              return (
                <tr key={key}>
                  <td>{RMS[key].id_no}</td>
                  <td>{RMS[key].name}</td>
                  <td>{RMS[key].place}</td>
                  <td>{RMS[key].addr}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      
    </>
  );
}

export default AddSupplier;
