import React from "react";
import "./login.css";
import { useState, useEffect } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SupplyChainABI from "../contracts/SupplyChain.json";
import LoaderComp from "./dashboard/LoaderComp";
import { Button } from "react-bootstrap";
import logo from "../assets/logo.png";

function Login(props) {
  // const [role, setRole] = useState();
  const [selectedRole, setSelectedRole] = useState(null);
  const [address, setAddress] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  // ________________web3___________________
  const [currentaccount, setCurrentaccount] = useState("");
  const [RMS, setRMS] = useState();
  const [MAN, setMAN] = useState();
  const [DIS, setDIS] = useState();
  const [RET, setRET] = useState();
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
      toast.error(
        "Non-Ethereum browser detected. You should consider trying MetaMask!",
        toastOptions
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
      const rmsCtr = await supplychain.methods.rmsCtr().call();
      const rms = {};
      for (i = 0; i < rmsCtr; i++) {
        rms[i] = await supplychain.methods.RMS(i + 1).call();
      }
      setRMS(rms);

      const manCtr = await supplychain.methods.manCtr().call();
      const man = {};
      for (i = 0; i < manCtr; i++) {
        man[i] = await supplychain.methods.MAN(i + 1).call();
      }
      setMAN(man);

      const disCtr = await supplychain.methods.disCtr().call();
      const dis = {};
      for (i = 0; i < disCtr; i++) {
        dis[i] = await supplychain.methods.DIS(i + 1).call();
      }
      setDIS(dis);

      const retCtr = await supplychain.methods.retCtr().call();
      const ret = {};
      for (i = 0; i < retCtr; i++) {
        ret[i] = await supplychain.methods.RET(i + 1).call();
      }
      setRET(ret);

      setloader(false);
    } else {
      toast.error(
        "The smart contract is not deployed to current network",
        toastOptions
      );
    }
  };

  // ____________________options______________________

  const options = [
    { value: "admin", label: "Admin" },
    { value: "supplier", label: "Supplier" },
    { value: "manufacturer", label: "Manufacturer" },
    { value: "distributor", label: "Distributor" },
    { value: "retailer", label: "Retailer" },
  ];

  const handleChangeRole = (selectedOption) => {
    setSelectedRole(selectedOption);
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let i;
      if (address == "0xCe6D526718E87A8102BEA2DccFF9e25998B9F324") {
        navigate("/mediguard/welcome");
      }
      else{
        toast.error("Something Went Wrong", toastOptions)
      }
      for (i = 0; i < Object.keys(RMS).length; i++) {
        if (address == RMS[i].addr && selectedRole.value == "supplier") {
          navigate("/mediguard/welcome");
        }
        else{
          toast.error("Something Went Wrong", toastOptions)
        }
      }
      for (i = 0; i < Object.keys(MAN).length; i++) {
        if (address == MAN[i].addr && selectedRole.value == "manufacturer") {
          navigate("/mediguard/welcome");
        }
      }
      for (i = 0; i < Object.keys(DIS).length; i++) {
        if (address == DIS[i].addr && selectedRole.value == "distributor") {
          navigate("/mediguard/welcome");
        }
      }
      for (i = 0; i < Object.keys(RET).length; i++) {
        if (address == RET[i].addr && selectedRole.value == "retailer") {
          navigate("/mediguard/welcome");
        }
      }

      const role = JSON.stringify(selectedRole.value);
      localStorage.setItem("role", role);
      loadBlockchaindata();
    } catch (err) {
      toast.error("Possible Error: Address not Valid " + err, toastOptions);
      // alert("An error occured!!!");
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
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Log In</h3>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Name"
              />
          </div>

          <div className="form-group mt-3">
            <label>Role</label>
            <Select
              options={options}
              onChange={handleChangeRole}
              placeholder="Role: Eg- Distributor"
              />
          </div>

          <div className="form-group mt-3">
            <label>ETH Address</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="ETH Address"
              onChange={handleChangeAddress}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              onClick={handleFormSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <ToastContainer/>
    </div>
              </>
  );
}

export default Login;
