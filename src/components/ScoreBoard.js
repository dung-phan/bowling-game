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
import "../styles/ScoreBoard.css";
class ScoreBoard extends Component {
  constructor() {
    super();
    this.rolls = { player1: [], player2: [] };
    this.currentRollIndex = 0;
    this.frames = Array.from(Array(10).keys());
  }
  //check the number of remaining pins that should be knocked down in a frame
  pinsRemaining = () => {
    const allScores = this.score();
    let pinsRemaining = 10;
    allScores.forEach((frame) => {
      if (frame.pinsRemaining !== null && !isNaN(frame.pinsRemaining)) {
        pinsRemaining = frame.pinsRemaining;
      }
    });
    return pinsRemaining;
  };
  //count the number of pins knocked down
  roll = (pins) => {
    const currentPlayerRolls = Object.values(this.rolls)[
      this.props.currentPlayerIndex
    ];
    let currentRollIndex = this.props.players[this.props.currentPlayerIndex]
      .currentRollIndex;
    currentPlayerRolls[currentRollIndex++] = pins;
    this.props.saveScore(
      this.props.players[this.props.currentPlayerIndex].id,
      this.score()
    );

    if (this.pinsRemaining() === 10) {
      this.props.nextPlayer(this.props.currentPlayerIndex);
    }
  };
  //counting score after a roll
  score = () => {
    let allScores = [];
    let score = 0;
    let frameIndex = 0;
    const currentPlayerRolls = Object.values(this.rolls)[
      this.props.currentPlayerIndex
    ];
    const firstRoll = () => currentPlayerRolls[frameIndex];
    const secondRoll = () => currentPlayerRolls[frameIndex + 1];
    const thirdRoll = () => currentPlayerRolls[frameIndex + 2];

    const frameScore = () => firstRoll() + secondRoll();

    const spareBonus = () => thirdRoll();

    const strikeBonus = () => secondRoll() + thirdRoll();

    const isStrike = () => firstRoll() === 10;

    const isSpare = () => frameScore() === 10;

    const saveFrame = (allScores, leftBox, rightBox, score, pinsRemaining) => {
      if (allScores.length < 9) {
        allScores.push({
          leftBox,
          rightBox,
          totalScore: score,
          pinsRemaining,
        });
      } else {
        const firstResult = firstRoll() === 10 ? "X" : firstRoll();
        const secondResult =
          secondRoll() === 10 ? "X" : isSpare() ? "/" : secondRoll();
        let thirdResult;
        if (thirdRoll() === 10) {
          thirdResult = "X";
        } else if (firstRoll() === 10 || firstRoll() + secondRoll() === 10) {
          thirdResult = thirdRoll();
        } else {
          thirdResult = "";
        }

        allScores.push({
          leftBox: firstResult,
          rightBox: secondResult,
          totalScore: score,
          pinsRemaining,
          extraBox: thirdResult,
        });
      }
    };
    // logic of score counting
    [...Array(10)].forEach(() => {
      if (isStrike()) {
        score += 10 + strikeBonus();
        saveFrame(allScores, "", "X", score, 10);
        frameIndex++;
      } else if (isSpare()) {
        score += 10 + spareBonus();
        saveFrame(allScores, firstRoll(), "/", score, 10);
        frameIndex += 2;
      } else {
        score += frameScore();
        const pinsRemaining =
          secondRoll() !== undefined ? 10 : 10 - firstRoll();
        saveFrame(allScores, firstRoll(), secondRoll(), score, pinsRemaining);
        frameIndex += 2;
      }
    });
    return allScores;
  };
  checkWinner = () => {
    const finalScores = this.props.players.map((player) => {
      if (player.rolls[9].totalScore) {
        return player.rolls[9].totalScore;
      }
    });

    if (finalScores[0] > finalScores[1]) {
      return this.props.countingWins(this.props.players[0].id);
    } else if (finalScores[0] < finalScores[1]) {
      return this.props.countingWins(this.props.players[1].id);
    } else if (finalScores[0] === finalScores[1]) {
      alert("Opps it is a draw");
    }
  };
  //reset the game
  reset = () => {
    this.props.resetGame();
    this.rolls = { player1: [], player2: [] };
  };
  render() {
    const { players } = this.props;
    const finalScores = this.props.players.map((player) => {
      if (player.rolls[9] && player.rolls[9].totalScore) {
        return player.rolls[9].totalScore;
      }
    });
    return (
      <div className="sb-wrapper">
        <ControlBoard
          handleRoll={this.roll}
          handleReset={this.reset}
          pinsRemaining={this.pinsRemaining()}
          currentPlayer={
            this.props.players.length > 0
              ? this.props.players[this.props.currentPlayerIndex].playerName
              : null
          }
        />
        <div className="controls">
          {[...Array(this.pinsRemaining() + 1)].map((frameData, i) => (
            <button key={i} className="roll" onClick={() => this.roll(i)}>
              {i}
            </button>
          ))}
        </div>
        <div>
          {players.length > 0
            ? players.map((player) => (
                <div className="score-board" key={player.id}>
                  <div className="frame-name" key={player.id}>
                    <div className="player-name">{player.playerName}</div>
                    <div className="player-name">{player.winningTimes}</div>
                  </div>
                  {this.frames.map((i) => (
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
        {finalScores[1] !== undefined ? (
          <button className="button" onClick={this.checkWinner}>
            Check winner
          </button>
        ) : null}
        {this.props.players.length === 2 ? null : <PlayerForm />}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    players: state.players,
    currentPlayerIndex: state.currentPlayerIndex,
  };
};
export default connect(mapStateToProps, {
  saveScore,
  nextPlayer,
  resetGame,
  countingWins,
})(ScoreBoard);
