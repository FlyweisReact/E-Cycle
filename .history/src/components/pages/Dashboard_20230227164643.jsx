/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { useNavigate } from "react-router-dom";
import img from "../SVG/home.svg";
import axios from "axios";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import Spinner from "react-bootstrap/Spinner";

export const dash = (data) => {
  return data;
};

const Dashboard = () => {
  const [userCount, setUserCount] = useState("");
  const [zoneCount, setZoneCount] = useState("");
  const [rideCount, setRideCount] = useState("");
  const [totalCycle, setTotalCycle] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchLocation = async () => {
    try {
      const { data } = await axios.get(
        "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/cycle/all"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const TotalUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/totaluser"
      );
      setUserCount(data?.Users);
    } catch (err) {
      console.log(err);
    }
  };

  const TotalZones = async () => {
    try {
      const { data } = await axios.get(
        "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/totalzones"
      );
      setZoneCount(data?.message);
    } catch (err) {
      console.log(err);
    }
  };

  const TotalRide = async () => {
    try {
      const { data } = await axios.get(
        "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/totalride"
      );
      setRideCount(data?.message);
    } catch (err) {
      console.log(err);
    }
  };

  const TotalCycle = async () => {
    try {
      const { data } = await axios.get(
        "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/cycle/all"
      );
      setTotalCycle(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    TotalUsers();
    TotalZones();
    TotalRide();
    TotalCycle();
    fetchLocation();
  }, []);

  const cycleCount = totalCycle?.message?.length;

  const card = [
    {
      title: "Total User's",
      number: userCount,
      icon: <i className="fa-solid fa-user text-2xl text-[#4099ff]"></i>,
      link: "/customer",
      bg: "#4099ff",
    },
    {
      title: "Total Zone's",
      number: zoneCount,
      icon: <i className="fa-solid fa-user text-2xl text-[#4099ff]"></i>,
      link: "/customer",
      bg: "#4099ff",
    },
    {
      title: "Total Ride's",
      number: rideCount,
      icon: <i className="fa-solid fa-user text-2xl text-[#4099ff]"></i>,
      link: "/customer",
      bg: "#4099ff",
    },
    {
      title: "Total E-Cycle's",
      number: cycleCount,
      icon: <i className="fa-solid fa-user text-2xl text-[#4099ff]"></i>,
      link: "/customer",
      bg: "#4099ff",
    },
  ];

  const containerStyle = {
    width: "100%",
    height: "800px",
  };

  const center = {
    lat: 23.0707,
    lng: 80.0982,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDntn5A6bf1VLX2WgNUetcG84HjRrCmE7w",
  });

  if (!isLoaded) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <div style={{ display: "flex", gap: "20px", marginBottom: "2%" }}>
        <img
          src={img}
          alt=""
          style={{
            backgroundColor: "#4099ff",
            padding: "8px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        />
        <p style={{ color: "black", fontSize: "18px", margin: "0" }}>
          Dashboard
        </p>
      </div>

      <section className="grid md:grid-cols-4 grid-cols-2 gap-y-6 gap-x-4">
        {card.map((card, index) => {
          return (
            <div
              className="px-5 py-8 bg-slate-200 space-y-2 shadow-xl flex flex-col  rounded-md"
              key={index}
              onClick={() => navigate(`${card.link ? card.link : "#"}`)}
              style={{ cursor: "pointer", backgroundColor: `${card.bg}` }}
            >
              <div className="grid  justify-between grid-cols-4">
                <div className="flex flex-col col-span-3 space-y-1">
                  <span
                    className="tracking-widest text-gray-900"
                    style={{ color: "white" }}
                  >
                    {card.title}
                  </span>
                  <span
                    className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold"
                    style={{ color: "white" }}
                  >
                    {card.number}
                  </span>
                </div>
                <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center myICons">
                  {card.img ? <img src={card.img} alt="" /> : card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <div style={{ marginTop: "5%" }}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={containerStyle}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {data?.message?.map((i, index) => (
            <MarkerF
              position={{ lat: parseFloat(i.lat), lng: parseFloat(i.long) }}
              key={index}
            />
          ))}
        </GoogleMap>
      </div>
    </>
  );
};

export default HOC(Dashboard);
