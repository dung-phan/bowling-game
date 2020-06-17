import { pinsRemaining } from "./Helpers";
describe("Bowling score", () => {
  it("should return 7 pins if the first throw hits 3 pins", () => {
    const score = [
      {
        leftBox: 3,
        totalScore: null,
        pinsRemaining: 7,
      },
    ];
    expect(pinsRemaining(score)).toEqual(7);
  });
  it("should return 10 pins if the first throw hits 10 pins", () => {
    const score = [
      {
        leftBox: 10,
        totalScore: null,
        pinsRemaining: 10,
      },
    ];
    expect(pinsRemaining(score)).toEqual(10);
  });
  it("should return 10 pins if a second throw is played", () => {
    const score = [
      {
        leftBox: 3,
        rightBox: 5,
        totalScore: 8,
        pinsRemaining: 10,
      },
    ];
    expect(pinsRemaining(score)).toEqual(10);
  });
});
