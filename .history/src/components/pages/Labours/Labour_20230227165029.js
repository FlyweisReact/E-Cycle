/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { Button, Modal, Form, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Labour = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/cycle/all"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [location, setLoction] = useState("");
    const [cycleNumber, setCycleNumber] = useState("");
    const [ imei , setIMEI ] = useState("")


    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/cycle",
          {
            location,
            cycleNumber,
            imei
          }
        );
        console.log(data);
        toast.success("Added");
        setModalShow(false);
        fetchData();
      } catch (err) {
        console.log(err);
      }
    };

    const editHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.put(
          `https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/cycle/update/${id}`,
          {
            location,
            cycleNumber,
            imei
          }
        );
        console.log(data);
        toast.success("Edited");
        setModalShow(false);
        fetchData();
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
            Add E-Cycle
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={edit ? editHandler : postHandler}>
              <Form.Group className="mb-3">
                <Form.Label> Cycle Number </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setCycleNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label> Station </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setLoction(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label> IMEI Number </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setIMEI(e.target.value)}
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
        `https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/cycle/delete/${id}`
      );
      console.log(data);
      toast.success("Deleted");
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

      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All E-Cycle
          </span>
          <Button
            variant="outline-success"
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
          >
            Add E-Cycle
          </Button>
        </div>
      </section>

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
            <th>Cycle Number</th>
            <th> Station </th>
            <th> IMIE Number </th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.message?.map((i, index) => (
            <tr key={index}>
              <td> {i.cycleNumber} </td>
              <td> {i.stations} </td>
              <td> {i.imei} </td>
              <td>
                <div style={{ display: "flex", gap: "10px" }}>
                  <AiFillDelete
                    color="red"
                    cursor="pointer"
                    onClick={() => deleteHandler(i._id)}
                  />
                  <AiFillEdit
                    color="blue"
                    cursor="pointer"
                    onClick={() => {
                      setId(i._id);
                      setEdit(true);
                      setModalShow(true);
                    }}
                  />
                    <i
                        class="fa-solid fa-eye"
                        onClick={() =>
                          navigate(`/bike/${i._id}/location/${i.imei}`)
                        }
                      ></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Labour);
