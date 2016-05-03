var LevelCompleteState = {
    
    create: function () {
        // Create the background and set it to the size of the game screen
        this.bg = this.game.add.sprite(0, 0, 'bg');
        this.bg.x = 0;
        this.bg.y = 0;
        this.bg.height = this.game.height;
        this.bg.width = this.game.width;
        
        // Add text
        
        
        if (this.nextLevel == 2)
        {
            var complete = this.game.add.text(100, 100, 'Level one complete!', { fontSize: '50px', fill: '#ffffff' });
        var restart = this.game.add.text(100, 200, 'Click to continue', { fontSize: '50px', fill: '#ffffff' });
        }
        if (this.nextLevel == 3)
        {
            var complete = this.game.add.text(100, 100, 'Level two complete!', { fontSize: '50px', fill: '#ffffff' });
        var restart = this.game.add.text(100, 200, 'Click to continue', { fontSize: '50px', fill: '#ffffff' });
        }
        if (this.nextLevel == 4)
        {
            var complete = this.game.add.text(100, 100, 'Level three complete!', { fontSize: '50px', fill: '#ffffff' });
        var restart = this.game.add.text(100, 200, 'Click to continue', { fontSize: '50px', fill: '#ffffff' });
        }
        if (this.nextLevel == 5)
        {
            var complete = this.game.add.text(100, 100, 'Level four complete!', { fontSize: '50px', fill: '#ffffff' });
        var restart = this.game.add.text(100, 200, 'Click to continue', { fontSize: '50px', fill: '#ffffff' });
        }
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
            if (this.nextLevel == 4)
            {
                this.game.state.start('levelFour');
            }
            if (this.nextLevel == 5)
            {
                this.game.state.start('levelFive');
            }
                
        }
    },
};