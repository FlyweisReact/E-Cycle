/** @format */
import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import HOC from "../../layout/HOC";
import { toast } from "react-toastify";
import axios from "axios";

const Help = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/help"
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
    const [ques, setQuestion] = useState("");
    const [ans, setAnswer] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/help",
          {
            ques,
            ans,
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
        size="lg-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Help&Support
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            style={{
              color: "black",
              margin: "auto",
            }}
            onSubmit={postHandler}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setAnswer(e.target.value)}
              />
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteHandler = async (id) => {
    try {
      const data = await axios.delete(
        `https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/help/${id}`
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
            Help&Support
            <hr style={{ width: "70%" }} />
          </span>
          <Button onClick={() => setModalShow(true)}>Add New</Button>
        </div>

        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
              {data?.message?.map((i, index) => (
                <tr>
                  <td>{i.ques}</td>
                  <td>{i.ans}</td>

                  <td style={{ display: "flex", gap: "10px" }}>
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

export default HOC(Help);
