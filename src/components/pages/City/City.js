/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Button, Modal, Form, Container, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const City = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/pack/pack/all"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [packname, setPack] = useState("");
    const [time, setTime] = useState("");
    const [desc, setDesc] = useState("");
    const [validity, setValidity] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/pack",
          {
            packname,
            time,
            desc,
            validity,
          }
        );
        console.log(data);
        toast.success(`Added`);
        setModalShow(false);
        fetchHandler();
      } catch (err) {
        console.log(err);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/pack/${id}`,
          {
            packname,
            time,
            desc,
            validity,
          }
        );
        console.log(data);
        toast.success(`Added`);
        setModalShow(false);
        fetchHandler();
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
            {edit ? "Edit" : "Add"} Pack
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={edit ? putHandler : postHandler}>
              <Form.Group className="mb-3">
                <Form.Label> Pack Name </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setPack(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label> Time </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setTime(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label> Description </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label> Validity </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setValidity(e.target.value)}
                />
              </Form.Group>

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

  const deleteHandler = async (id) => {
    try {
      const data = await axios.delete(
        `https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/pack/${id}`
      );
      console.log(data);
      toast.success("Deleted");
      fetchHandler();
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
            All Pack's
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

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
              <th>Description</th>
              <th>Validity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.message?.map((i, index) => (
              <tr key={index}>
                <td> {i.packname} </td>
                <td> {i.time} </td>
                <td> {i.desc} </td>
                <td> {i.validity} </td>
                <td>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <AiFillDelete
                      color="red"
                      cursor={"pointer"}
                      onClick={() => deleteHandler(i._id)}
                    />
                    <i
                      class="fa-solid fa-pen-to-square"
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => {
                        setEdit(true);
                        setId(i._id);
                        setModalShow(true);
                      }}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default HOC(City);
