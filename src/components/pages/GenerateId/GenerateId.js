/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const GenerateId = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [id, setID] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/ride/all"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Add Hero
  function MyVerticallyCenteredModal(props) {
    const [rideType, setRideType] = useState("");
    const [time, setTime] = useState("");
    const [distance, setDistance] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/ride/",
          {
            rideType,
            time,
            distance,
          }
        );
        console.log(data);
        toast.success("Added");
        fetchData();
        setModalShow(false);
      } catch (err) {
        console.log(err);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.put(
          `https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/ride/${id}`,
          {
            rideType,
            time,
            distance,
          }
        );
        console.log(data);
        toast.success("Edited");
        fetchData();
        setModalShow(false);
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {edit ? "Edit Ride Type" : "Add Ride Type"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={edit ? putHandler : postHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Ride Type</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setRideType(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setTime(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Distance</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setDistance(e.target.value)}
                />
              </Form.Group>
              <Button variant="outline-success" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/ride/${id}`
      );
      console.log(data);
      toast.success(`Deleted `);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

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
            All Ride's
            <hr style={{ width: "70%" }} />
          </span>
          <Button
            style={{
              backgroundColor: "#4099ff",
              color: "#fff",
              borderRadius: "0",
              border: "1px solid #4099ff",
              padding: "10px",
            }}
            onClick={() => {
              setModalShow(true);
              setEdit(false);
            }}
          >
            Add Ride's
          </Button>
        </div>

        <div style={{ overflow: "auto", marginTop: "2%" }} className="response">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Ride Type</th>
                <th> Time </th>
                <th> Distance </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.message?.map((i, index) => (
                <tr key={index}>
                  <td> {i.rideType} </td>
                  <td> {i.time} </td>
                  <td> {i.distance}KM </td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <i
                        class="fa-solid fa-pen-to-square"
                        style={{ color: "#267cb5", cursor: "pointer" }}
                        onClick={() => {
                          setID(i._id);
                          setModalShow(true);
                          setEdit(true);
                        }}
                      ></i>
                      <i
                        class="fa-solid fa-trash"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => deleteHandler(i._id)}
                      ></i>
                    </div>
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
export default HOC(GenerateId);
