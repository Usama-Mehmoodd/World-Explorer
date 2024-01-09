import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TopBar from "./component/TopBar";
import { Row, Col, Card, Dropdown, Button } from "react-bootstrap";

import Loader from "./component/Loader";
import ViewCountry from "./component/ViewCountry";

export default function App() {
  const [data, setData] = React.useState([]);
  const [tempData, setTempData] = React.useState([...data]);
  const [index, setIndex] = React.useState([]);

  const [loader, setLoader] = React.useState(false);

  React.useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    setLoader(true);
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        // let dta = data;
        let arr = data.slice(0, 10);
        setData(arr);
        setTempData(data);
        setIndex(10);
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      });
  }

  // function handleLoadMore() {
  //   console.log("arrived");
  //   let state = [...data];
  //   console.log(state);

  //   let lastIndex1 =  state.length + 10;
  //   // let lastIndex2 =  state.length + 20;

  //   console.log(lastIndex1);

  //   // console.log(data);
  //   // let accmulator = 10;
  //   // let state =  data.slice(0, 10);
  //   // accmulator += state;
  //   // let arr2 = state.slice(lastIndex1, lastIndex2);

  //   let arr1 = state.slice(0, lastIndex1);

  //   let newArr = [...state, ...arr1];
  //   setData(newArr);
  //   setTempData(newArr);
  // }

  function handleLoadMore() {
    // console.log("arrived");
    // console.log(index); //10

    let state = [...tempData]; //250

    let elems = state.slice(0, index + 10);
    setIndex(index + 10);
    // console.log(elems);
    setData(elems);
  }

  let filterarr = [
    "Oceania",
    "Africa",
    "Europe",
    "Asia",
    "Americas",
    "Antarctic",
  ];
  //  filterarr = [...new Set(data?.map((v, i) => v?.region))]
  //  console.log(filterarr);

  function handleFilterRegions(e) {
    let res = e.target.value;
    // console.log(res);
    let state = [...tempData];

    if (res === "") {
      fetchData();
      return;
    }

    let filterValues = state?.filter((v, i) => v.region === res);
    setData(filterValues);
  }

  function handleSearchBar(e) {
    let userValue = e.target.value;
    let state = [...tempData];

    let searchData = state?.filter((v, i) => {
      if (userValue === "") {
        return v;
      } else {
        return v.name.common.toLowerCase().includes(userValue);
      }
    });

    setData([...searchData]);
  }

  const [view, setView] = React.useState(false);

  const [dataHold, setDataHold] = React.useState({});

  function viewDetailPage(para) {
    // console.log(para);
    setDataHold(para);
    handleView();
  }
  // <ViewCountry show={view} setView={setView} dataHold={dataHold} />

  function handleView(e) {
    // console.log("success");
    // console.log(view);
    setView(true);
  }

  /*    sorting portion   */

  function handleSorting(e) {
    setLoader(true);
    // console.log(e.target.value);
    // console.log("arrived");
    if (e.target.value === "default") {
      let state = [...tempData];
      let arr = state.slice(0, data.length);
      setData(arr);
      setLoader(false);
      return;
    }
    if (e.target.value === "a-z") {
      let state = [...tempData];
      let arr = state.slice(0, data.length);
      arr.sort(function (a, b) {
        if (a.name.common < b.name.common) {
          return -1;
        }
        if (a.name.common > b.name.common) {
          return 1;
        }
        return 0;
      });
      setData(arr);
      // setData(state);
      setLoader(false);
      return;
    }
    if (e.target.value === "z-a") {
      let state = [...tempData];
      let arr = state.slice(0, data.length);
      arr.sort(function (a, b) {
        if (a.name.common < b.name.common) {
          return 1;
        }
        if (a.name.common > b.name.common) {
          return -1;
        }
        return 0;
      });
      // setData(state);
      setData(arr);
      setLoader(false);

      return;
    }
    setLoader(false);
  }

  /*top button */

  function handleTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /*  handle Load More   */

  return (
    <div>
      <TopBar />
      <br />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
          padding: "10px",
        }}
      >
        <div className="me-3">
          <Button variant="success" onClick={fetchData}>
            Refresh
          </Button>
        </div>
        <div className="me-3">
          <select className="form-select" onChange={handleFilterRegions}>
            <option value="">Continent wise</option>
            {filterarr.map((v, i) => (
              <option key={v + i}>{v}</option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="search here..."
            className="form-control"
            placeholder="search"
            onChange={handleSearchBar}
          />
        </div>

        <div className="ms-3 me-3">
          <select className="form-select" onChange={(e) => handleSorting(e)}>
            <option value={"default"}>Sort by: Default</option>
            <option value={"a-z"}>A - Z</option>
            <option value={"z-a"}>Z - A</option>
          </select>
        </div>
      </div>

      <Row>
        {loader ? (
          <Loader />
        ) : (
          data?.map((v, i) => (
            <Col md={4} className="mainContent mb-3" key={i}>
              <Card>
                <Card.Body style={{ minHeight: "380px" }}>
                  <img
                    src={v?.flags?.png}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                      // border:'1px solid grey'
                    }}
                  />

                  <div className="mt-3"></div>
                  <div className="me-3">
                    <div className="d-flex justify-content-between">
                      <h6>Name : {v?.name?.common}</h6>
                      <h6>Capital : {v?.capital}</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                      <h6>Region : {v?.region}</h6>

                      <h6>Area : {v?.area}</h6>
                    </div>

                    <h6>Population : {v?.population}</h6>
                    <div className="d-flex justify-content-end">
                      <div>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                            size="sm"
                          >
                            More Info
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              href="#/action-1"
                              onClick={() => viewDetailPage(v)}
                            >
                              View
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              Share
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
      {data.length > 10 && (
        <div className="btns" style={{ position: "" }}>
          <button
            className="topBtn"
            onClick={handleTop}
            style={{
              position: "fixed",
              top: "90%",
              left: "90%",
              border: "none",
              outline: "none",
              padding: "5px 15px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              boxShadow: "0px 0px 3px black",
              cursor: "pointer",
            }}
          >
            Move top
          </button>
        </div>
      )}

      <div>
        <button
          style={{
            position: "relative",
            top: "95%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "none",
            outline: "none",
            padding: "5px 15px",
            backgroundColor: "#fff",
            color: "red",
            fontWeight: "bold",
            borderRadius: "8px",
            cursor: "pointer",
            border: "1px solid red",
            boxShadow: "0px 0px 2px",
            marginTop: "20px",
          }}
          className="readBtn"
          onClick={handleLoadMore}
        >
          Load more
        </button>
      </div>

      <ViewCountry show={view} setView={setView} dataHold={dataHold} />
    </div>
  );
}
