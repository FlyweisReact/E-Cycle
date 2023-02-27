/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table } from "react-bootstrap";
import img from "../SVG/list.svg";
import axios from "axios";

const CommonUser = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/payment/deposits/all"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
        }}
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            All Security Deposit
            <hr style={{ width: "70%" }} />
          </span>
        </div>

        <Table
          striped
          bordered
          hover
          style={{
            marginTop: "2%",
            scrollBehavior: "smooth",
            overflow: "scroll",
          }}
        >
          <thead>
            <tr>
              <th> Customer Name </th>
              <th> Customer Email </th>
              <th> Customer IMIE </th>
              <th> Customer Mobile Number </th>
              <th>Amount </th>
            </tr>
          </thead>
          <tbody>
            {data?.message?.map((i, index) => (
              <tr key={index}>
                <td> {i.user?.name} </td>
                <td> {i.user?.email} </td>
                <td> {i.user?.IMEI} </td>
                <td> {i.user?.mobile} </td>
                <td> {i.amount} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </>
  );
};
export default HOC(CommonUser);
