import React from "react";
import '../../dashboard/table.css'
import Sidebar from "../Sidebar";
import {useState, useEffect } from "react";
import SupplyChainABI from "../../../contracts/SupplyChain.json"
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap"
import LoaderComp from "../LoaderComp"

function AllDist() {
  const [currentaccount, setCurrentaccount] = useState("");
  
  
  const [DIS, setDIS] = useState();
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();


  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

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
      const disCtr = await supplychain.methods.disCtr().call();
      const dis = {};
      for (i = 0; i < disCtr; i++) {
        dis[i] = await supplychain.methods.DIS(i + 1).call();
      }
      setDIS(dis);
      setloader(false);
    } else {
      toast.error(
        "The smart contract is not deployed to current network",
        toastOptions
      );
    }
  };
  if (loader) {
    return (
      <div className="d-flex align-items-center justify-content-center flex-column vh-100">
      <LoaderComp />
      <h1 className="wait">Loading...</h1>
    </div>
    );
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
        className="border border-dark rounded-3"
        style={{ width: "60vw", height: "88vh" }}
      >

        {/* HEADER */}
        <div
          className="header bg-dark text-light d-flex align-items-center justify-content-center"
          style={{ height: "25vh", borderRadius: "5px 5px 0px 0px" }}
        >
          <h3>Distributor</h3>
        </div>

        {/* TABLE */}

        <div className="table" style={{ height: "53vh" }}>
          <table style={{ width: "100%", border: "1px solid black" }}>
            <thead>
              <td>ID</td>
              <td>Name</td>
              <td>Location</td>
              <td>ETH Address</td>
            </thead>

            <tbody>
            {Object.keys(DIS || {}).map(function (key) {
                {var index = parseInt(key)}
                return (
                  <tr key={key}>
                    <td>{index+1}</td>
                  <td>{DIS[key].name}</td>
                  <td>{DIS[key].place}</td>
                  <td>{DIS[key].addr}</td>
                </tr>
              );
            })}

          </tbody>
            
          </table>
        </div>
      </div>

        </div>
      </div>
<ToastContainer />


      
    </>
  );
}

export default AllDist;
