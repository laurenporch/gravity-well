var LevelCompleteState = {
    
    /*init: function (thiscustomParam)
    {
        this.nextLevel = this.customParam;
    },*/
    
    create: function () {
        // Set background
        this.game.stage.backgroundColor = '#000000';
        
        // Add text
        var youLost = this.game.add.text(100, 100, 'Level complete!', { fontSize: '50px', fill: '#ffffff' });
        var restart = this.game.add.text(100, 200, 'Click to continue', { fontSize: '50px', fill: '#ffffff' });
    },
    
    // Typical update function
    update: function () {
        // Call the game if they click the screen
        if (this.game.input.activePointer.isDown) {
            if (this.nextLevel == 2)
            {
                this.game.state.start('levelTwo');
            }
            if (this.nextLevel == 3)
            {
                this.game.state.start('levelThree');
            }
        }
    },
};