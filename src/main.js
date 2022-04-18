//David Diaz 
//Rocket Patrol Mod 
//4/18/2022 
//It took me 4 hours
//
//Points Breakdown:
//-Implement the speed increase that happens after 30 seconds in the original game (5)
//      The speed increases after 30 seconds and then again at 60,90 and so on.
//-Randomize each spaceship's movement direction at the start of each play (5)
//-Implement parallax scrolling (10)
//      the stars in the back move slower than the much closer meteors
//-Display the time remaining (in seconds) on the screen (10)
//      time is on the top right
//-Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
//      the very top small ship is worth 60 points and moves faster than the other ships
//-Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
//      adds 1,2,3,6 seconds for the ships going bottom to top
//-Implement an simultaneous two-player mode (30)
//      p1 uses a,d,w and p2 uses left, right, up in this cooperative mode
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

//set UI sixes
let borderUISize = game.config.height /15;
let borderPadding = borderUISize / 3;

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;