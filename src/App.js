/** @format */

import { Routes, Route } from "react-router-dom";
import Login from "./components/forms/Login";
import Dashboard from "./components/pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Customers from "./components/pages/Customers/Customers";
import Cat from "./components/pages/Cat/Cat";
import Terms from "./components/pages/Terms&Condition/Terms";
import Privacy from "./components/pages/PrivacyPolicy/Privacy";
import Help from "./components/pages/Help/Help";
import Labour from "./components/pages/Labours/Labour";
import GenerateId from "./components/pages/GenerateId/GenerateId";
import NotifyLabour from "./components/pages/Notifications/NotifyLabour";
import NotifyCustomer from "./components/pages/Notifications/NotifyCustomer";
import Payment from "./components/pages/Payment/Payment";
import Transaction from "./components/pages/Transaction/Transaction";
import City from "./components/pages/City/City";
import Graph from "./components/pages/City/Graph";
import PushNotification from "./components/pages/Notification/PushNotification";
import CommonUser from "./components/pages/CommonUser";
import Servie from "./components/pages/Payment/Servie";
import BikeLoction from "./components/pages/City/BikeLoction";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer" element={<Customers />} />
        <Route path="/city" element={<City />} />
        <Route path="/generateId" element={<GenerateId />} />
        <Route path="/Notice/Customer" element={<NotifyCustomer />} />
        <Route path="/pay" element={<Payment />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/help" element={<Help />} />
        <Route path="/labour" element={<Labour />} />
        <Route path="/Notice/Labour" element={<NotifyLabour />} />
        <Route path="/notification" element={<PushNotification />} />
        <Route path="/trans" element={<Transaction />} />
        <Route path="/common" element={<CommonUser />} />



        <Route path="/cat" element={<Cat />} />
        <Route path="/graph/:id" element={<Graph />} />
        <Route path="/service" element={<Servie />} />
        <Route path="/bike/:id/location/:imie" element={<BikeLoction />} />

      </Routes>
    </>
  );
}

export default App;
