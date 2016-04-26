var LoseState = {
    
    create: function () {
        // Set background
        this.game.stage.backgroundColor = '#000000';
        
        // Add text
        var youLost = this.game.add.text(100, 100, 'You lost!', { fontSize: '50px', fill: '#ffffff' });
        var restart = this.game.add.text(100, 200, 'click to restart', { fontSize: '50px', fill: '#ffffff' });
    },
    
    // Typical update function
    update: function () {
        // Call the game if they click the screen
        if (this.game.input.activePointer.isDown) {
            this.game.state.start('start');
        }
    },
};