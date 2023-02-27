/** @format */

import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, FloatingLabel } from "react-bootstrap";
import HOC from "../../layout/HOC";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

const Privacy = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/privacy"
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
    const [privacy, setP] = useState("");

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.put(
          "https://ledihbp1a7.execute-api.ap-south-1.amazonaws.com/dev/api/v1/privacy/63c15a469e7590426808025c",
          {
            privacy,
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
        size="lg-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Privacy Policy
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            style={{
              color: "black",
              margin: "auto",
            }}
            onSubmit={putHandler}
          >
            <FloatingLabel
              controlId="floatingTextarea"
              label="Privacy policy"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                onChange={(e) => setP(e.target.value)}
              />
            </FloatingLabel>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
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
            Privacy Policy
            <hr style={{ width: "70%" }} />
          </span>
        </div>

        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Privacy Policy</th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data?.privacy?.privacy}</td>
                <td style={{ display: "flex", gap: "10px" }}>
                  <AiFillEdit
                    color="blue"
                    cursor={"pointer"}
                    onClick={() => {
                      setModalShow(true);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Privacy);
