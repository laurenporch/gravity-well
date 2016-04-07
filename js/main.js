window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
    
    // Make some variables
    var player;
    var bg;
    // Jump sound
    var jump;
    // Crate to push around
    var crate;
    var platform;
    var platforms;
    var ground;
    var ceiling;
    var cursors;
    // Boolean value to track gravity changes
    var gravityIsNormal;
    // Boolean to track open door
    var doorIsOpen;
    // Exit
    var door;
    // Button
    var button;
    
    // Add all of the states
    game.state.add('start', StartState);
    game.state.add('lose', LoseState);
    game.state.add('win', WinState);
    game.state.add('play', GameState);
    
    // Start the first state
    game.state.start('start');
};
