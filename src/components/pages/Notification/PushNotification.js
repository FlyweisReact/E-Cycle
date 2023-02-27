/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const PushNotification = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/notify"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const AddNote = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/notify",
        {
          message,
        }
      );
      console.log(data);
      toast.success("Notification Added");
      fetchHandler();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const data = await axios.delete(
        `https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/notify/delete/${id}`
      );
      console.log(data);
      toast.success("Notification Deleted");
      fetchHandler();
    } catch (err) {
      console.log(err);
    }
  };

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
            Send Notification
            <hr style={{ width: "70%" }} />
          </span>
        </div>
        <div className="NewForm">
          <div className="mb-3">
            <p>Message:*</p>
            <textarea
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
      </section>
      <br />
      <button
        style={{
          color: "#fff",
          backgroundColor: "#4099ff",
          padding: "10px",
          fontSize: "18px",
          textAlign: "center",
          display: "block",
          margin: "auto",
          marginTop: "2% !important",
          width: "100px",
        }}
        type="submit"
        onClick={AddNote}
      >
        Send
      </button>

      <section
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
          marginTop: "5%",
          marginBottom: "5%",
        }}
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            Notification List
            <hr style={{ width: "70%" }} />
          </span>
        </div>

        <div style={{ overflow: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Notification type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.message?.map((i, index) => (
                <tr key={index}>
                  <td> {i.message} </td>
                  <td>
                    <i
                      class="fa-solid fa-trash"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => deleteHandler(i._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(PushNotification);
