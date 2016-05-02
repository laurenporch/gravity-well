window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
    
    var player; // Player
    var bg; // Background image
    var jump;   // Jump sound
    // Crate to push around
    var crate;  // Companion cube
    var platform;   // A single platform
    var platforms;  // GROUP of platforms
    var ground; // "Ground" platform
    var ceiling;    // "Ceiling" platform
    var cursors;    // Controls
    var gravityIsNormal;    // Boolean value to track gravity changes
    var doorIsOpen; // Boolean to track open door
    var door;   // Exit door
    var button; // Button to push to open door
    var menuKey;    // Assigns key 'm' so that it can be used
    var lastState;  // Holds string that indicates what the last state was
    var bgs; // Background music
    
    // Tim's pull mechanic variables
    var touchingCrate; // boolean to see if player is touching the crate
    var pulling; // boolean to see if player is pulling the crate
    
    //Added by Luke
    var layer;
    var layer2;
    var map;
    var nextLevel;
    
    // Add all of the states
    game.state.add('start', StartState);
    game.state.add('lose', LoseState);
    game.state.add('win', WinState);
    game.state.add('levelOne', LevelOneState);
    game.state.add('mainMenu', MainMenuState);
    game.state.add('levelTwo', LevelTwoState);
    game.state.add('levelThree', LevelThreeState);
    game.state.add('levelComplete',LevelCompleteState);
    game.state.add('levelFour',LevelFourState);
    game.state.add('levelFive',LevelFiveState);
    
    // Start the first state
    game.state.start('start');
};
