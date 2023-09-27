import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "../../../contracts/SupplyChain.json";
import { Button } from "react-bootstrap";
// import QRCode from "react-qr-code";
import Sidebar from "../Sidebar";
import LoaderComp from "../LoaderComp";
import add from "../../../assets/add.png";
import QRCode from "qrcode.react";

function Manufacture() {
  const navigate = useNavigate();

  const canvasRef = useRef(null);

  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedId, setMedId] = useState();
  const [MedName, setMedName] = useState();
  const [MedDes, setMedDes] = useState();
  const [MedStage, setMedStage] = useState();
  const [qr, setqr] = useState();

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
        <LoaderComp />
        <h1 className="wait">Loading...</h1>
      </div>
    );
  }

  const handlerChangeIdMED = (e) => {
    setMedId(e.target.value);
  };
  const handlerChangeNameMED = (event) => {
    setMedName(event.target.value);
  };
  const handlerChangeDesMED = (event) => {
    setMedDes(event.target.value);
  };
  const handlerSubmitMED = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
      .addMedicine(MedId, MedName, MedDes)
      .send({ from: currentaccount });
      if (reciept) {
        setqr(MedId);
        loadBlockchaindata();
        console.log(reciept);
      }
    } catch (err) {
      alert("Medicne Error!");
    }
  };
  // console.log(SupplyChain.events);
  // const eventOnce = () => {
  //   SupplyChain.once("medReg", (error, event) => {
  //     if(!error) console.log(event);
  //     else console.log(`Error: ${error}`);
  //   })
  // }

  // eventOnce();

  const downloadQR = () => {
    const canvas = document.getElementById("qr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${qr}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setqr();
  };


  return (
    <>
      {!qr ? (
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
                <h4 className="mb-5 bolder">Manufacture New Medicine</h4>
                <img src={add} alt="Add med" width={350} />
              </div>

              <div
                className="right bg-dark text-light d-flex flex-column align-items-center justify-content-center"
                style={{ height: "88vh", width: "33vw" }}
              >
                <form
                  className="d-flex flex-column align-items-center bg-dark p-3"
                  style={{ width: "30vw" }}
                  onSubmit={handlerSubmitMED}
                >
                  <span>Medicine ID</span>
                  <input
                    type="number"
                    value={MedId}
                    onChange={handlerChangeIdMED}
                  />

                  <span>Name</span>
                  <input
                    type="text"
                    value={MedName}
                    onChange={handlerChangeNameMED}
                  />

                  <span>Description</span>

                  <input
                    type="text"
                    value={MedDes}
                    onChange={handlerChangeDesMED}
                  />
                </form>
                <Button onClick={handlerSubmitMED}>Manufacture Medicne</Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                className="left d-flex flex-column align-items-center justify-content-center border"
                style={{ height: "88vh", width: "27vw" }}
              >
                <h4 className="mb-5 bolder">Medicine Registered</h4>
                <img src={add} alt="Add med" width={350} />
              </div>

              <div
                className="right d-flex flex-column"
                style={{ height: "88vh", width: "33vw" }}
              >
                <div
                  className="heading bg-dark text-light p-5"
                  style={{ height: "25vh", width: "33vw" }}
                >
                  <h3 className="text-center">
                    Medicine <br /> Registered Successfully
                  </h3>
                </div>
                <div className="qr d-flex align-items-center justify-content-center flex-column my-4">
                  <QRCode
                    id="qr"
                    value={`${qr}`}
                    size={290}
                    level={"H"}
                    includeMargin={true}
                  />

                  <Button className="col-6" onClick={downloadQR}>
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Manufacture;
