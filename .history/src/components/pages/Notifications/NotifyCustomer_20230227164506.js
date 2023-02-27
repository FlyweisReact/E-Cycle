/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Button, Modal, Form, Container, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NotifyCustomer = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [id, setID] = useState("");
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const fetchhandler = async () => {
    try {
      const { data } = await axios.get(
        "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/location"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchhandler();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const data = await axios.delete(
        `https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/location/${id}`
      );
      console.log(data);
      toast.success(" Deleted");
      fetchhandler();
    } catch (err) {
      console.log(err);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [location, setC] = useState("");
    const [bikes, setM] = useState("");
    const [distance, setE] = useState("");
    // const [imei, setIMEI] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/location",
          {
            location,
            bikes,
            distance,
            // imei,
          }
        );
        console.log(data);
        toast.success("Added");
        fetchhandler();
        setModalShow(false);
      } catch (err) {
        console.log(err);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.put(
          `https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/location/${id}`,
          {
            location,
            bikes,
            distance,
          }
        );
        console.log(data);
        toast.success("Edit");
        fetchhandler();
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
          <Modal.Title id="contained-modal-title-vcenter">Add Bike</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={edit ? putHandler : postHandler}>
              <Form.Group className="mb-3">
                <Form.Label> Location </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setC(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Bikes </Form.Label>
                <Form.Control
                  type="text"
                  min={0}
                  onChange={(e) => setM(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Distance </Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setE(e.target.value)}
                />
              </Form.Group>
              {/* <Form.Group className="mb-3">
                <Form.Label>IMEI Number </Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setIMEI(e.target.value)}
                />
              </Form.Group> */}
              <Button variant="outline-dark" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

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
            All Zone's
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
              setEdit(false);
              setModalShow(true);
            }}
          >
            Add New
          </Button>
        </div>

        <div
          style={{
            overflowX: "auto",
            padding: "10px",
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Bikes</th>
                <th>Location </th>
                <th>Distance </th>
                {/* <th>IMEI Number </th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.message?.map((i, index) => (
                <tr key={index}>
                  <td> {i.bikes} </td>
                  <td> {i.location} </td>
                  <td> {i.distance} KM </td>
                  {/* <td> {i.bikesIMEI} </td> */}
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <AiFillDelete
                        color="red"
                        cursor={"pointer"}
                        onClick={() => deleteHandler(i._id)}
                      />
                      <i
                        class="fa-solid fa-pen-to-square"
                        style={{ cursor: "pointer", color: "blue" }}
                        onClick={() => {
                          setID(i._id);
                          setEdit(true);
                          setModalShow(true);
                        }}
                      ></i>
                      {/* <i
                        class="fa-solid fa-eye"
                        onClick={() =>
                          navigate(`/bike/${i._id}/location/${i.imei}`)
                        }
                      ></i> */}
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

export default HOC(NotifyCustomer);
