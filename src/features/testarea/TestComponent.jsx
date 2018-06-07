import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
// import Script from 'react-load-script';
// import GoogleMapReact from 'google-map-react';

import { incrementAsync, decrementAsync } from "./testActions";
import { openModal } from "../modals/modalActions";

const mapState = state => ({
  data: state.test.data,
  loading: state.test.loading
});

const actions = {
  incrementAsync,
  decrementAsync,
  openModal
};

// const Marker = () => <Icon name='marker' size='big' color='red'/>

class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    address: "",
    scriptLoaded: false
  };

  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true });
  };

  onChange = address => this.setState({ address });

  render() {
    const {
      incrementAsync,
      decrementAsync,
      data,
      openModal,
      loading
    } = this.props;
    return (
      <div>
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button
          loading={loading}
          onClick={incrementAsync}
          color="green"
          content="Increment"
        />
        <Button
          loading={loading}
          onClick={decrementAsync}
          color="red"
          content="Decrement"
        />
        <Button
          onClick={() => openModal("TestModal", { data: 42 })}
          color="teal"
          content="Open Modal"
        />
        <br />
        <br />
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
