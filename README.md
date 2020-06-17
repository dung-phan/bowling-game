![Netlify Status](https://api.netlify.com/api/v1/badges/7a2b3940-04de-4a62-9531-b1442be13387/deploy-status)

# BOWLING SCORING SYSTEM

## [ Check out the deployed version on Netlify! ](https://bowling-score.netlify.app)

## What this project is about

My approach to build the bowling game scoring system, using React and Redux for state management

## Table of contents:

- **[Features](#features)**
- **[Instructions](#instructions)**
- **[File Structure](#file-structure)**
- **[Improvements](#improvements)**

## Features

As a player, you can:

- Add two players with names
- Manually add scores for each player
- Tracks the number of games won for each player
- Reset all game stats and start over
- Correctly calculates bowling scores

## Instructions

1. Navigate to the [repository](https://github.com/dung-phan/bowling-game)
2. Clone locally using
   `git@github.com:dung-phan/bowling-game.git`
3. cd bowling-game
4. Install dependencies using `npm install`
5. Start your server using `npm start`
6. Navigate to app in [browser](http://localhost:3000)
7. Players can enter their names in

## File Structure

```
-src
 -assets
 -components
   - App
   - ControlBoard
   - Frame
   - PlayerForm
   - ScoreBoard
 -redux
 -styles
-README.md
```

## Improvements

- Add more tests to helper functions and redux store
- The app is designed for laptop users only and therefore is not responsive.
