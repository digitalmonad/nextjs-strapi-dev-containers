"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  Polygon,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-draw/dist/leaflet.draw.css";
import { useState, useEffect } from "react";

type MapProps = {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
}

const defaults = {
  zoom: 10,
};

type Location = {
    id: string,
    longtitude: number,
    latitude: number
}



const Map = (Map: MapProps) => {
  const { zoom = defaults.zoom, posix } = Map;
  const [locations, setLocations] = useState<Location[]>([]);
  const [polygons, setPolygons] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/locations");
        const data = await response.json();

        setLocations(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);



  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        <EditControl
          position="topright"
          draw={{
            rectangle: false,
            polyline: false,
            circle: false,
            circlemarker: false,
            marker: false,
          }}
          edit={{
            remove: true,
          }}
        />
      </FeatureGroup>
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longtitude]}
          draggable={false}
        >
          <Popup>Hey ! I study here</Popup>
        </Marker>
      ))}


{polygons.map((polygon, idx) => (
        <Polygon key={idx} positions={polygon} />
      ))}
    </MapContainer>
  );
};

export default Map;
