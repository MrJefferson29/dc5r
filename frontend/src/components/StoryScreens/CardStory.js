import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "../GeneralScreens/Loader";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit, FiArrowLeft } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.css";
import { Col, Row, Container } from "react-bootstrap";
import styled from "styled-components";

const Story = ({ story }) => {
  return (
    <Styles>
      <Container style={{ backgroundColor: 'rgb(217, 219, 220)'}}>
        <Container>
        <Row >
          <Col md="8">
            <p style={{ fontWeight: "700", fontSize: "1.3rem" }}>
              Tracking ID:{" "}
              <font
                style={{
                  fontFamily: "Gaqire",
                  fontSize: "1.5rem",
                  letterSpacing: "2px",
                  fontWeight: "bolder",
                }}
              >
                {story.title}
              </font>
            </p>
          </Col>
          <Col md="4">
            <p style={{ fontWeight: "600", fontSize: "1.3rem" }}>
              Package Status:{" "}
              <font
                style={{
                  fontFamily: "Gaqire",
                  fontSize: "1.5rem",
                  letterSpacing: "2px",
                  fontWeight: "bolder",
                }}
              >
                {story.content}
              </font>
            </p>
          </Col>
          <Row>
            <p style={{ fontSize: "1.3rem", fontWeight: "700" }}>
              To be received by {story.receiver}, {story.insurrance}
            </p>
            <p style={{ fontSize: "1.3rem", fontWeight: "700" }}>
              Began transit on{" "}
              <font
                style={{
                  fontSize: "1.3rem",
                  letterSpacing: "2px",
                  fontWeight: "700",
                }}
              >
                {story.depart}
              </font>{" "}
              and should be expected in{" "}
              <font
                style={{
                  fontSize: "1.3rem",
                  letterSpacing: "2px",
                  fontWeight: "700",
                }}
              >
                {story.expect}
              </font>
            </p>
            <h3 className="girl">Package Weight and Dimensions.</h3>
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Weight:{" "}
              <font style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                {story.weight}
              </font>
            </p>
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Dimensions: Undefined
            </p>
            <h2 className="girl">Delivery Notes:</h2>
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Please ensure someone is available to receive the package. If you
              have specific delivery preferences or instructions, contact our
              customer service.
            </p>
            <h2 className="girl">Proof of Delivery:</h2>
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Upon delivery, the package will require a signature from the
              recipient. The proof of delivery with the recipient's name and
              signature will be available on our tracking portal.
            </p>
            <h2 className="girl">Exception Notifications</h2>
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              In case of any delivery issues or exceptions, you will receive
              timely notifications. For further assistance, please contact our
              customer service.
            </p>
            <h2 className="girl">Insurrance Informtion</h2>
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Your shipment fee is required on freight transit due insurrance. Conditions
              apply. For details, please refer to our insurance policy.
            </p>
            <h2 className="girl">Weather Conditions:</h2>
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Please note that weather conditions may impact delivery schedules.
              We monitor weather updates to minimize any disruptions.
            </p>
            <h2 className="girl">Contact Information</h2>
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              For assistance or inquiries, our customer support team can be
              reached at equineexcellence.help@gmail.com
            </p>
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Thank you for choosing Vishis Logistics. We appreciate your trust
              and look forward to delivering your package with care and
              efficiency. For real-time updates and additional information,
              visit our tracking portal at www.vishislogistics.com/tracking.
            </p>
          </Row>
        </Row>
        </Container>
      </Container>
    </Styles>
  );
};

export default Story;
const Styles = styled.div`
  overflow-x: hidden;
  margin-top: 50px;
`;
