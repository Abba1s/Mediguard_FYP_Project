import { Button } from "react-bootstrap";
import React from "react";
import { useState,useEffect } from "react";
import add from "../../../assets/add.png";
import Sidebar from "../Sidebar";
import Web3 from "web3";
import SupplyChainABI from "../../../contracts/SupplyChain.json"
import { useNavigate } from "react-router-dom";
import LoaderComp from "../LoaderComp";


function AddMan() {
  const [currentaccount, setCurrentaccount] = useState("");

  const [MANname, setMANname] = useState();
  const [MANaddress, setMANaddress] = useState();
  const [MANplace, setMANplace] = useState();
  const [MAN, setMAN] = useState();
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();

  const handlerChangeAddressMAN = (event) => {
    setMANaddress(event.target.value);
  };
  const handlerChangePlaceMAN = (event) => {
    setMANplace(event.target.value);
  };
  const handlerChangeNameMAN = (event) => {
    setMANname(event.target.value);
  };
  const handlerSubmitMAN = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addManufacturer(MANaddress, MANname, MANplace)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
        navigate("/mediguard/dashboard/user/man/opt/all")
      }
    } catch (err) {
      alert("An error occured!!!");
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
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
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
      const manCtr = await supplychain.methods.manCtr().call();
      const man = {};
      for (i = 0; i < manCtr; i++) {
        man[i] = await supplychain.methods.MAN(i + 1).call();
      }
      setMAN(man); 
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
          <h4 className="mb-5 bolder">New Manufacturer</h4>
          <img src={add} alt="Add User" width={350} />
        </div>

        <div
          className="right bg-dark text-light d-flex flex-column align-items-center justify-content-center"
          style={{ height: "88vh", width: "33vw" }}
        >
          <form className="d-flex flex-column justify-content-start align-items-center bg-dark" style={{ width: "30vw" }}
          onSubmit={handlerSubmitMAN}>
            <label>
             <span>
             Name
                </span> 
              <input
                type="text" style={{marginLeft:"20px"}}
                // value={name}
                onChange={handlerChangeNameMAN}
              />
            </label>

            <label>
            <span>
            Location
                </span> 
              
              <input
                type="text"
                // value={name}
                onChange={handlerChangePlaceMAN}
              />
            </label>
            <label>
            <span>
            ETH Add
                </span> 
              <input
                type="text"
                // value={name}
                onChange={handlerChangeAddressMAN}
              />
            </label>
          </form>
          <Button onClick={handlerSubmitMAN}>Add Manufacturer</Button>
        </div>
      </div>


        </div>
      </div>


{/* __________________________________ */}
<table style={{ width: "100%", border: "1px solid black" }}>
            <thead>
              <td>ID</td>
              <td>Name</td>
              <td>Location</td>
              <td>ETH Address</td>
            </thead>

            <tbody>
            {Object.keys(MAN || {}).map(function (key) {
              return (
                <tr key={key}>
                  {/* <td>{RMS[key].id_no}</td> */}
                  <td>{key}</td>
                  <td>{MAN[key].name}</td>
                  <td>{MAN[key].place}</td>
                  <td>{MAN[key].addr}</td>
                </tr>
              );
            })}

          </tbody>
          </table>

      
    </>
  );
  
}

export default AddMan;
