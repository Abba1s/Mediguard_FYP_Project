import { Button } from "react-bootstrap";
import React from "react";
import { useState, useEffect } from "react";
import add from "../../../assets/add.png";
import Sidebar from "../Sidebar";
import Web3 from "web3";
import SupplyChainABI from "../../../contracts/SupplyChain.json";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderComp from "../LoaderComp";

// import './adduser.css'

function AddDist() {
  const [currentaccount, setCurrentaccount] = useState("");

  const [DISname, setDISname] = useState();
  const [DISaddress, setDISaddress] = useState();
  const [DISplace, setDISplace] = useState();
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

  const handlerChangeAddressDIS = (event) => {
    setDISaddress(event.target.value);
  };
  const handlerChangePlaceDIS = (event) => {
    setDISplace(event.target.value);
  };
  const handlerChangeNameDIS = (event) => {
    setDISname(event.target.value);
  };
  const handlerSubmitDIS = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addDistributor(DISaddress, DISname, DISplace)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
        navigate("/mediguard/dashboard/user/dist/opt/all");
      }
    } catch (err) {
      toast.error("Possible Error: Address not Valid " + err, toastOptions);
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
      toast.error(
        "Non-Ethereum browser detected. You should consider trying MetaMask!",
        toastOptions
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
              <h4 className="mb-5 bolder">New Distributor</h4>
              <img src={add} alt="Add User" width={350} />
            </div>

            <div
              className="right bg-dark text-light d-flex flex-column align-items-center justify-content-center"
              style={{ height: "88vh", width: "33vw" }}
            >
              <form
                className="d-flex flex-column justify-content-start align-items-center bg-dark"
                style={{ width: "30vw" }}
              >
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    style={{ marginLeft: "20px" }}
                    // value={name}
                    onChange={handlerChangeNameDIS}
                  />
                </label>

                <label>
                  <span>Location</span>

                  <input
                    type="text"
                    // value={name}
                    onChange={handlerChangePlaceDIS}
                  />
                </label>
                <label>
                  <span>ETH Add</span>
                  <input
                    type="text"
                    // value={name}
                    onChange={handlerChangeAddressDIS}
                  />
                </label>
              </form>
              <Button onClick={handlerSubmitDIS}>Add Distributor</Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddDist;
