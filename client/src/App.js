import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OptSupplier from "./components/dashboard/userOpt/OptSupplier";
import AddSupplier from "./components/dashboard/AddUsers/AddSupplier";
import AllSuppliers from "./components/dashboard/AllUsers/AllSupplier";
import OptMan from "./components/dashboard/userOpt/OptMan";
import AddMan from "./components/dashboard/AddUsers/AddMan";
import AllMan from "./components/dashboard/AllUsers/AllMan";
import OptDist from "./components/dashboard/userOpt/OptDist";
import AddDist from "./components/dashboard/AddUsers/AddDist";
import AllDist from "./components/dashboard/AllUsers/AllDist";
import OptRet from "./components/dashboard/userOpt/OptRet";
import AddRetailer from "./components/dashboard/AddUsers/AddRetailer";
import AllRet from "./components/dashboard/AllUsers/AllRet";
import Welcome from "./components/dashboard/Welcome";
import TrackMed from "./components/dashboard/medicince/TrackMed";
import AllMed from "./components/dashboard/medicince/AllMed";
import Supply from "../src/components/dashboard/supplier/Supply";
import Retail from "../src/components/dashboard/retailer/Retail";
import Distribute from "../src/components/dashboard/distributor/Distribute";
import Manufacture from "../src/components/dashboard/manufacturer/Manufacture";
import Login from "./components/Login";
import LandingPage from "../src/pages/LandingPage";
import OrderMedicine from "./components/dashboard/OrderMedicine";
import Verify from "./components/Verify";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/mediguard/login" element={<Login />}></Route>
          <Route path="/mediguard/welcome" element={<Welcome />}></Route>
      

          {/* SUPPLIER */}
          <Route
            path="/mediguard/dashboard/user/supp"
            Component={OptSupplier}
          ></Route>

          <Route
            path="/mediguard/dashboard/user/supp/opt/add"
            Component={AddSupplier}
          ></Route>

          <Route
            path="/mediguard/dashboard/user/supp/opt/all"
            Component={AllSuppliers}
          ></Route>
        
          {/* MANUFACTURER */}

          <Route
            path="/mediguard/dashboard/user/man"
            Component={OptMan}
          ></Route>

          <Route
            path="/mediguard/dashboard/user/man/opt/add"
            Component={AddMan}
          ></Route>
          <Route
            path="/mediguard/dashboard/user/man/opt/all"
            Component={AllMan}
          ></Route>

         
          {/* DISTRIBUTOR */}
          <Route
            path="/mediguard/dashboard/user/dist"
            Component={OptDist}
          ></Route>

          <Route
            path="/mediguard/dashboard/user/dist/opt/add"
            Component={AddDist}
          ></Route>
          <Route
            path="/mediguard/dashboard/user/dist/opt/all"
            Component={AllDist}
          ></Route>

          {/* RETAILER */}

          <Route
            path="/mediguard/dashboard/user/ret"
            Component={OptRet}
          ></Route>

          <Route
            path="/mediguard/dashboard/user/ret/opt/add"
            Component={AddRetailer}
          ></Route>
          <Route
            path="/mediguard/dashboard/user/ret/opt/all"
            Component={AllRet}
          ></Route>
          {/* _______________________ */}
          <Route
            path="/mediguard/dashboard/supplier/supply"
            Component={Supply}
          ></Route>
          <Route
            path="/mediguard/dashboard/manufacturer/manufacture"
            Component={Manufacture}
          ></Route>
          <Route
            path="/mediguard/dashboard/distributer/distribute"
            Component={Distribute}
          ></Route>
          <Route
            path="/mediguard/dashboard/retailer/retail"
            Component={Retail}
          ></Route>

          {/* ________Medicine__________ */}

          <Route
            path="/mediguard/dashboard/user/order"
            Component={OrderMedicine}
          ></Route>

          <Route
            path="/mediguard/dashboard/medicine/track"
            Component={TrackMed}
          ></Route>
          <Route
            path="/mediguard/dashboard/medicine/verify"
            Component={Verify}
          ></Route>
          <Route
            path="/mediguard/dashboard/medicine/all"
            Component={AllMed}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
