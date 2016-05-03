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
            switch (this.lastState)
            {
                case 1:
                    this.game.state.start('levelOne');
                    break;
                case 2:
                    this.game.state.start('levelTwo');
                    break;
                case 3:
                    this.game.state.start('levelThree');
                    break;
                case 4:
                    this.game.state.start('levelFour');
                    break;
                case 5:
                    this.game.state.start('levelFive');
                    break;
                case 6:
                    this.game.state.start('levelSix');
                    break;
            }
        }
    },
};