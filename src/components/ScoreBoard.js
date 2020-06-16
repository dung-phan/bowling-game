import React, { Component } from "react";
import { connect } from "react-redux";
import {
  saveScore,
  nextPlayer,
  resetGame,
  countingWins,
} from "../redux/actions";
import ControlBoard from "./ControlBoard";
import Frame from "./Frame";
import PlayerForm from "./PlayerForm";
import { pinsRemaining, score, checkWinner, roll } from "./Helpers";
import "../styles/ScoreBoard.css";
class ScoreBoard extends Component {
  render() {
    const {
      players,
      currentPlayerIndex,
      rolls,
      countingWins,
      nextPlayer,
      saveScore,
    } = this.props;
    const finalScores = players.map((player) => {
      if (player.rolls[9] && player.rolls[9].totalScore) {
        return player.rolls[9].totalScore;
      }
      return null;
    });
    return (
      <div className="sb-wrapper">
        <ControlBoard
          handleRoll={roll}
          handleReset={this.props.resetGame}
          pinsRemaining={
            players.length > 0
              ? pinsRemaining(score(rolls, currentPlayerIndex))
              : null
          }
          currentPlayer={
            players.length > 0 ? players[currentPlayerIndex].playerName : null
          }
        />
        <div className="controls">
          {rolls.length > 0
            ? [
                ...Array(pinsRemaining(score(rolls, currentPlayerIndex)) + 1),
              ].map((frameData, i) => (
                <button
                  key={i}
                  className="roll"
                  onClick={() =>
                    roll(
                      i,
                      rolls,
                      currentPlayerIndex,
                      players,
                      nextPlayer,
                      saveScore
                    )
                  }
                >
                  {i}
                </button>
              ))
            : null}
        </div>
        <div className="player-board">
          {players.length > 0
            ? players.map((player) => (
                <div className="score-board" key={player.id}>
                  <div className="frame-name" key={player.id}>
                    <div className="player-name">{player.playerName}</div>
                    <div className="player-name">{player.winningTimes}</div>
                  </div>

                  {Array.from(Array(10).keys()).map((i) => (
                    <Frame
                      key={i}
                      frameNumber={i + 1}
                      leftBox={
                        player.rolls[i] && player.rolls[i].leftBox
                          ? player.rolls[i].leftBox
                          : null
                      }
                      rightBox={
                        player.rolls[i] && player.rolls[i].rightBox
                          ? player.rolls[i].rightBox
                          : null
                      }
                      extraBox={
                        player.rolls[i] && player.rolls[i].extraBox
                          ? player.rolls[i].extraBox
                          : null
                      }
                      score={
                        player.rolls[i] && player.rolls[i].totalScore
                          ? player.rolls[i].totalScore
                          : null
                      }
                    />
                  ))}
                </div>
              ))
            : null}
        </div>
        {finalScores[players.length - 1] ? (
          <button
            className="button"
            onClick={() => checkWinner(players, countingWins)}
          >
            Check winner
          </button>
        ) : null}
        {rolls[0] && rolls[0].length > 0 ? null : <PlayerForm />}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    players: state.players,
    currentPlayerIndex: state.currentPlayerIndex,
    rolls: state.rolls,
  };
};
export default connect(mapStateToProps, {
  saveScore,
  nextPlayer,
  resetGame,
  countingWins,
})(ScoreBoard);
