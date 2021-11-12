import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Container } from "react-bootstrap";

class MapContainer extends Component {
  render() {
    return (
      <Container
        style={{
          overflow: "hidden",
          paddingBottom: "56.25%",
          position: "relative",
          height: "0",
        }}
      >
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: this.props.lat,
            lng: this.props.lng,
          }}
          style={{
            left: "0",
            top: "0",
            height: "100%",
            width: "100%",
            position: "absolute",
          }}
        >
          <Marker
            title={this.props.name}
            name={this.props.name}
            position={{
              lat: this.props.lat,
              lng: this.props.lng,
            }}
          />

          <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
        </Map>
      </Container>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GKEY,
})(MapContainer);
