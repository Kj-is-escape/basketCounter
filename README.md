# Basket Counter

Simple online counter for basketball free throws.

This website was built for a specific usage and its features are very limited.

## Usage

This software is supposed to be used as part of a setup in wich a basketball hoop is connected to a mouse and scoring makes the mouse click. 
To start playing press the spacebar and a timer will start on the screen, when the timer runs off,  your score and the maximum score will be shown on screen.
To play again simply press the spacebar once again.

*Notes:*
* Refreshing the page resets the whole game, erasing the highest score and all of the configuration (except for what's written in the code itself).
* There's a minimum time between two consecutive points to allow for debouncing.
* The page is meant to be used in fullscreen on a screen in "lanscape mode" (w>h).

## Configuration

The configuration is minimal and there are intentionally no hits on the screen.
Pressing A, S and D changes the colour mode of the page:
* D is dark mode, black background and white letters.
* S is light mode, white background and black letters.
* A is board mode, using the same colours as a basketball board.
Pressing the C key opens a simple form to update the round and bounce time, the round time is the time each player has to play (in seconds), bounce time is the minimum time between two consecutive points (in milliseconds).
