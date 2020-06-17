import React, { Component } from "react";
import { connect } from "react-redux";
import {
  saveScore,
  nextPlayer,
  resetGame,
  countingWins,
  endGame,
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
      endGame,
      resetGame,
    } = this.props;

    return (
      <div className="sb-wrapper">
        <ControlBoard
          handleRoll={roll}
          handleReset={resetGame}
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
                      saveScore,
                      endGame
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

        {players.length > 0 ? (
          <button
            disabled={this.props.gameNotOver}
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
    gameNotOver: state.gameNotOver,
  };
};
export default connect(mapStateToProps, {
  saveScore,
  nextPlayer,
  endGame,
  resetGame,
  countingWins,
})(ScoreBoard);
