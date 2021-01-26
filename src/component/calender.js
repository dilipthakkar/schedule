import React, { ReactNode, Component } from "react";
import ApiCalendar from "react-google-calendar-api";






export default class StatusSign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sign: ApiCalendar.sign,
    };
    this.signUpdate = this.signUpdate.bind(this);
    ApiCalendar.onLoad(() => {
      ApiCalendar.listenSign(this.signUpdate);
    });
  }

  signUpdate(sign) {
    this.setState({
      sign,
    });
  }

  render() {
    return <div>{this.state.sign}</div>;
  }
}
