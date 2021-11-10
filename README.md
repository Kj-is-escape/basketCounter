# Basket Counter

Simple online counter for basketball free throws.
  
This website was built for a specific usage and its features are very limited.  
To see the website itself go to [kj-is-escape.github.io/basketCounter/](https://kj-is-escape.github.io/basketCounter/)

## Usage

This software is meant to be used as part of a setup in wich a basketball hoop is connected to a mouse and scoring makes the mouse click.   
To start playing press the spacebar and a timer will start on the screen, when the timer runs off,  your score and the maximum score will be shown on screen.  
To play again simply press the spacebar once again.  
  
*Notes:*
* Refreshing the page resets the whole game, erasing the highest score and all of the configuration (except for what's written in the code itself).
* There's a minimum time between two consecutive points to allow for debouncing.
* The page is meant to be used in fullscreen on a screen in "lanscape mode" (w>h).

## Configuration

The configuration is minimal and there are intentionally no hints on the screen.  

Pressing **A**, **S** and **D** changes the colour mode of the page:
* **D** is dark mode, black background and white letters.
* **S** is light mode, white background and black letters.
* **A** is board mode, using the same colours as a basketball board (this is the default).  

Pressing the **C** key opens the configuration form, which has the following fields:
* **Bounce time:** The minimum time between two consecutive points (in milliseconds).
* **Round time:** The time each player has to play before the time runs out (in seconds).
* **Start key:** The keycode* of the key which starts the timer.
* **Stop key:** The keycode* of the key which stops the timer and finishes the round.
* **Click side:** Selects which click (left/right) is used to increment the score.
* **Opposite side starts timer:** If selected, the opposite click to the one that increments the score will start the timer.
* **Save to file button:** Will download a .json file with the configuration, it is used as a form of persistent storage.
* **Load from file button:** Opens up a dialog to upload a .json file created with the previous button and loads the configuration from it.
*\*It is advised to use the keycode number instead of the string because the font used doesn't distinguish between Upper and Lowercase but keycodes do*

Pressing the **Escape** key closes the configuration form.

## Downloading

To download the page for offline viewing just download the code as a zip (Code>Download ZIP) and extract it somewhere, then open the index.html file with any browser (preferably firefox) and it should work.