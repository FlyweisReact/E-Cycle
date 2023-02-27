/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const BikeLoction = () => {
  const { id, imei } = useParams();
  const [position, setPosition] = useState({
    lat: 48.8584,
    lng: 2.2945,
  });

  const putData = useCallback(async () => {
    try {
      const { data } = await axios.post(
        `https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/cycle/updatelocation/${id}`,
        { imei }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }, [id, imei]);


  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/cycle/get/${id}`
      );
      console.log(data);
      setPosition({
        lat: parseFloat(data?.message?.lat),
        lng: parseFloat(data?.message?.long),
      });
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    putData();
    setTimeout(() => {
      fetchData();
    }, [2000]);
  }, [putData, fetchData]);

  const containerStyle = {
    width: "100%",
    height: "800px",
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
      <div>
        <GoogleMap
          center={position}
          zoom={15}
          mapContainerStyle={containerStyle}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <MarkerF position={position} />
        </GoogleMap>
      </div>
    </>
  );
};

export default HOC(BikeLoction);
