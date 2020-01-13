# Pong.. in Electron.
![CC BY-SA 4.0](https://img.shields.io/badge/license-CC%20BY--SA%204.0-7289da?style=flat-square) ![Version](https://img.shields.io/github/package-json/v/BeanedTaco/electron-pong?style=flat-square)

This is a pong game that I made for my CS class, and I built it using the Node.js and the Electron framework. This is my first project created with Electron, and it was a fun experience doing it. I created it with no experience in Electron and finished in 6 hours total.

You can find an online version of Electron Pong at http://ping-ponge.glitch.me/.
## Precautions
I had to remove the Content Security Policy so ``window.close()`` would work (because I couldn't figure out how to use remote window closing). If any of y'all could help me out, feel free to start a pull request!

## How to download and run Electron Pong

### Prerequisites needed
- a computer
- you
- your hands or feet or whatever you use to type
- node.js

### How to download Electron Pong
- Download the repository using the "Download ZIP" button on GitHub or clone the repo using ``git clone https://github.com/electron/electron-quick-start.git``
- In your terminal of choice, run ``npm install`` in the folder that you downloaded Electron Pong into to download needed packages
- Once all the packages have been installed, (again in the terminal) run ``electron .`` in the same directory
- ***Profit!***

## Credits
This was originally created using Electron's [Quick Start app](https://github.com/electron/electron-quick-start) as a base. Made by *yours truly*.
