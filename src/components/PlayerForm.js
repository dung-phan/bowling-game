import React from "react";
import { connect } from "react-redux";
import { addNewPlayer } from "../redux/actions";
import "../styles/PlayerForm.css";
class PlayerForm extends React.Component {
  state = { playerName: "" };
  //create new player
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addNewPlayer(this.state.playerName);
    this.setState({
      playerName: "",
    });
  };
  render() {
    return (
      <div className="pf-input">
        <form onSubmit={this.handleSubmit}>
          <input
            className="pf-form"
            autoComplete="off"
            type="text"
            name="playerName"
            value={this.state.playerName}
            onChange={this.handleChange}
            placeholder="Enter a new player"
          />
        </form>
      </div>
    );
  }
}
export default connect(null, {
  addNewPlayer,
})(PlayerForm);
