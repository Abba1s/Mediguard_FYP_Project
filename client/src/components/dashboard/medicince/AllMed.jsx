import React from "react";
import "../table.css";
import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";
import "react-bootstrap";

import Web3 from "web3";
import SupplyChainABI from "../../../contracts/SupplyChain.json"
import { useNavigate } from "react-router-dom";
import LoaderComp from "../LoaderComp"

function AllMed() {

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
          med[i + 1] = await supplychain.methods.MedicineStock(i + 1).call();
          medStage[i + 1] = await supplychain.methods.showStage(i + 1).call();
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
          <h3>All Medicines</h3>
        </div>

        {/* TABLE */}

        <div className="table" style={{ height: "53vh" }}>
          <table style={{ width: "100%", border: "1px solid black" }}>
            <thead>
              <td>ID</td>
              <td>Name</td>
              <td>Description</td>
              <td>Medicine Stage</td>
            </thead>

            <tbody>
            {Object.keys(MED || {}).map(function (key) {
                return (
                  <tr key={key}>
                        <td>{key}</td>
                        <td>{MED[key].name}</td>
                        <td>{MED[key].description}</td>
                        <td>
                            {
                                MedStage[key]
                            }
                        </td>
                    </tr>
              );
            })}

          </tbody>
          </table>
        </div>
      </div>

        </div>
      </div>



      
    </>
  );
}

export default AllMed;
