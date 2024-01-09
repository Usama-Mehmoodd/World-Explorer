import React from "react";
import GoogleMap from "./GoogleMap";
import { Modal, ModalBody, ModalTitle, ModalHeader } from "react-bootstrap";

export default function ViewCountry({ show, setView, dataHold }) {
  // console.log(dataHold);

  
  return (
    <Modal
      size="lg"
      show={show}
      onHide={() => setView(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          <h3>{dataHold?.name?.common}</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            minWidth: "500px",
            minHeight: "400px",
          }}
          className="md-6"
        >
          <div
            style={{
              border: "1px solid silver",
              borderRadius: "0px 0px 8px 8px",
            }}
          >
            <img
              style={{
                width: "300px",
                height: "200px",
              }}
              src={dataHold?.flags?.png}
            />
            <div style={{ margin: "15% 5px" }}>
              <div className="d-flex justify-content-between">
                <h6>Name : {dataHold?.name?.common}</h6>
                <h6>Capital : {dataHold?.capital}</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6>Region : {dataHold?.region}</h6>

                <h6>Area : {dataHold?.area}</h6>
              </div>

              <h6>Population : {dataHold?.population}</h6>
            </div>
          </div>
          <div
            style={{
              minWidth: "400px",
              border: "1px solid silver",
              borderRadius: "8px",
              margin: "0px 8px",
              padding: "10px",
              // width:'200px',
              // height:'200px',
            }}
          >
            <h6 className="mb-5">
              <b>Open Google Map:</b> {dataHold?.maps?.googleMaps}
            </h6>
            <h6 className="mb-4">
              <b>Languages:</b> {dataHold?.languages?.eng}{" "}
              {dataHold?.languages?.ara} {dataHold?.languages?.urd}{" "}
              {dataHold?.languages?.tir} {dataHold?.languages?.dan}
              {dataHold?.languages?.slk} {dataHold?.languages?.tam} 
              {dataHold?.languages?.pus} {dataHold?.languages?.tuk}
              {dataHold?.languages?.slk} {dataHold?.languages?.fra} 
              {dataHold?.languages?.fas}


            </h6>
            <h6 className="mb-4">
              <b>Timezones:</b> {dataHold?.timezones}
            </h6>
            <h6 className="mb-4">
              <b>Latitude:</b> {dataHold?.latlng}
            </h6>
            <h6 className="mb-4">
              <b>Sub-region:</b> {dataHold?.subregion}
            </h6>
          </div>
        </div>
        <div id="map">
        
            <GoogleMap 
            dataHold={dataHold}
            />

        </div>
      </Modal.Body>
    </Modal>
  );
}


