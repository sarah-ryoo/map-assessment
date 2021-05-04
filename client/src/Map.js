import React, { useState, useCallback, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Axios from 'axios';
import './App.css';

function Map() {
    // Initial map centered at Vancouver
    const [viewport, setViewport] = useState({
      width: "200wh",
      height: "100vh",
      latitude: 49.2418,
      longitude: -123.1107,
      zoom: 12   
    });

    // Initial marker and its set location
    const [marker, setMarker] = useState({
      latitude: 49.2418,
      longitude: -123.1126
    });


    // Set lat and long of new location once marker is dropped
    const onMarkerDrop = useCallback(event => {
      setMarker({
        longitude: event.lngLat[0],
        latitude: event.lngLat[1]
      });
    });
      
    const [namedLocation, setNamedLocation] = useState("");
    const [latitude, setLat] = useState();
    const [longitude, setLong] = useState();

    const setLocation = () => {
      Axios.post("http://localhost:3001/api/insert", {
        namedLocation: namedLocation,
        latitude: latitude,
        longitude: longitude,
      }).then(res => {
        console.log(res);
        
      })
    };

    const [locationsList, setLocationsList] = useState([]);

    // useEffect(() => {
    //   Axios.get("http://localhost:3001/api/get")
    //     .then(response => {
    //       const list = setLocationsList(response.data);
    //       response.send(JSON.stringify(list));
    //       console.log(response.data);
    //   });
    // });

    return (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/sryoo/cko4t21lc1j8b17uni40whcjb"
        onViewportChange={nextViewport => setViewport(nextViewport)}
      > 

        <Marker 
          longitude={marker.longitude} 
          latitude={marker.latitude}
          draggable={true}
          onDragEnd={onMarkerDrop}
        >
        </Marker>
1
          <Popup
            longitude={marker.longitude}
            latitude={marker.latitude}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom-right"
          >
            <div>
              <input type="text" id="starting-point" onChange={(e) => {
                setNamedLocation(e.target.value);
                setLat(marker.latitude);
                setLong(marker.longitude);
              }}/>
              <button onClick={setLocation}>Set</button>
            </div>

          </Popup>
            {locationsList.map(value => {
              return <h3>Location: {value.namedLocation}</h3>
          })};

        <Marker 
          longitude={-123.1216} 
          latitude={49.2416}
          draggable={true}
          onDragEnd={onMarkerDrop}
        >
        </Marker>

          <Popup
            longitude={-123.1216}
            latitude={49.2416}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom-right"
          >
            <div>
              <input type="text" id="finish-point" onChange={(e) => {
                setNamedLocation(e.target.value);
                setLat(marker.latitude);
                setLong(marker.longitude);
                console.log(e.target.value, marker.longitude)
              }}/>
              <button onClick={setLocation}>Set</button>
            </div>

          </Popup>
          {locationsList.map(value => {
            return <h3>Location: {value.namedLocation}</h3>
          })};

      </ReactMapGL>
    );
}

export default Map;