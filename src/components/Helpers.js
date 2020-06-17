//count the number of pins knocked down
export function roll(
  pins,
  rolls,
  currentPlayerIndex,
  players,
  nextPlayer,
  saveScore,
  endGame
) {
  const currentPlayerRolls = rolls[currentPlayerIndex];
  let currentRollIndex = players[currentPlayerIndex].currentRollIndex;
  currentPlayerRolls[currentRollIndex++] = pins;
  saveScore(players[currentPlayerIndex].id, score(rolls, currentPlayerIndex));

  if (pinsRemaining(score(rolls, currentPlayerIndex)) === 10) {
    nextPlayer(currentPlayerIndex);
  }
  const lastScore =
    players[players.length - 1].rolls[9] &&
    players[players.length - 1].rolls[9].leftBox;
  if (lastScore) {
    endGame();
  }
}

export function pinsRemaining(score) {
  const allScores = score;
  let pinsRemaining = 10;
  allScores.forEach((frame) => {
    if (frame.pinsRemaining !== null && !isNaN(frame.pinsRemaining)) {
      pinsRemaining = frame.pinsRemaining;
    }
  });
  return pinsRemaining;
}
//counting score after a roll

export function score(rolls, currentPlayerIndex) {
  let allScores = [];
  let score = 0;
  let frameIndex = 0;
  const currentPlayerRolls = rolls[currentPlayerIndex];
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
      const pinsRemaining = secondRoll() !== undefined ? 10 : 10 - firstRoll();
      saveFrame(allScores, firstRoll(), secondRoll(), score, pinsRemaining);
      frameIndex += 2;
    }
  });
  return allScores;
}
export function checkWinner(players, countingWins) {
  const finalScores = players.map((player) => {
    if (player.rolls[9].totalScore) {
      return player.rolls[9].totalScore;
    }
    return null;
  });
  const winningScore = Math.max.apply(Math, finalScores);
  if (winningScore) {
    const winner = players.filter((player) => {
      return player.rolls[9].totalScore === winningScore;
    });
    return countingWins(winner[0].id);
  }
}
