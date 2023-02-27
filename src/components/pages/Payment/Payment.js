/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { Button, Modal, Form, Container } from "react-bootstrap";
import axios from "axios";

const Payment = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/offer"
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
    const [url, setUrl] = useState("");
    const [image, setI] = useState("");
    const [desc, setDesc] = useState("");

    const postDetails = (e) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/offer",
          {
            image: url,
            desc,
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

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Pricing Section
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={postHandler}>
              <Form.Group className="mb-3">
                <Form.Label> Image </Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setI(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label> Description </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setDesc(e.target.value)}
                  onClick={() => postDetails()}
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
        `https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/offer/${id}`
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
            All Offers List
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
            onClick={() => setModalShow(true)}
          >
            Add New
          </Button>
        </div>

        <section
          className="main-card--container"
          style={{ color: "black", marginBottom: "10%" }}
        >
          {data?.offer?.map((i) => {
            return (
              <>
                <div className="card-container">
                  <div className="card">
                    <div className="card-body">
                      <img
                        src={i.image}
                        style={{ width: "100%", height: "200px" }}
                        alt=""
                      />
                      <div
                        className="card-title"
                        style={{ textAlign: "center" }}
                      >
                        {i.desc}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          variant="outline-danger"
                          onClick={() => deleteHandler(i._id)}
                        >
                          {" "}
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </section>
      </section>
    </>
  );
};

export default HOC(Payment);
