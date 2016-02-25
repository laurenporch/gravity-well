// This creates a variable called StartGame and assigns the Phaser.State qualities to it.
var StartGame = function {
    Phaser.State.call(this);
}

// This does... Something.
StartGame.prototype = Object.create(Phaser.State);
// Assigns the variable StartGame to the constructor of whatever the previous line did.
StartGame.prototype.constructor = StartGame;

// This opens up the usual preload function.
StartGame.prototype.preload = function {
    // Preload images/sounds/etc here
}

// Initialize text variable.
var text;

// This opens up the usual create function.
StartGame.prototype.create = function {
    // Create objects here.
    // Background and text.
    game.stage.backgroundColor("#000000");
    text = game.add.text(this, game.world.centerX, game.world.centerY, "Click to start");
}

// This opens up the usual update function.
StartGame.prototype.update = function {
    // Update stuff here.
    // If left mouse button is down, "start" the game (go to PlayGame state).
    if (game.input.activePointer.isDown) {
        game.state.start(PlayGameState);
    }
}