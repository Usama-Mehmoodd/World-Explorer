// import React from 'react'
import React, { useEffect } from "react";

const GoogleMap = ({ dataHold }) => {
  let lat = dataHold?.latlng[0];
  let lng = dataHold?.latlng[1];

  useEffect(() => {
    const myMap = () => {
      const mapProp = {
        center: new window.google.maps.LatLng(lat, lng),
        zoom: 5,
      };
      const map = new window.google.maps.Map(
        document.getElementById("googleMap"),
        mapProp
      );
      myMap();
    };

    // Load the Google Maps API script
    const script = document.createElement("script");
    script.src = "https://goo.gl/maps/ko1dzSDKg8Gsi9A98";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Clean up function to remove the script when the component is unmounted
    return () => {
      document.head.removeChild(script);
    };
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div>
      <h2>GoogleMap: {dataHold?.name?.common}</h2>
      <div id="googleMap" style={{ width: "100%", height: "400px" }}>
        <br/>
        <h4>to be countinued..!</h4>
      </div>
    </div>
  );
};

export default GoogleMap;
