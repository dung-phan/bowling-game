import React from "react";

export default function Frame({
  frameNumber,
  leftBox,
  rightBox,
  extraBox,
  score,
}) {
  return (
    <div className="frame">
      <div className="frame-number">{frameNumber}</div>
      <div className="frame-score">
        <div className="box left">{leftBox || null}</div>
        <div className="box right">{rightBox || null}</div>
        <div className="box extra">{extraBox}</div>
      </div>
      <div className="score-update">{!isNaN(score) && score}</div>
    </div>
  );
}
