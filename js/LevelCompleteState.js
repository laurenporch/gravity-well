var LevelCompleteState = {
    
    create: function () {
        
        // Story elements between levels        
        if (this.nextLevel == 1) {
            // Create the background and set it to the size of the game screen
            this.bg = this.game.add.sprite(0, 0, 'level-one');
            this.bg.x = 0;
            this.bg.y = 0;
            this.bg.height = this.game.height;
            this.bg.width = this.game.width;
        }
        if (this.nextLevel == 2)
        {
            this.bg = this.game.add.sprite(0, 0, 'level-two');
            this.bg.x = 0;
            this.bg.y = 0;
            this.bg.height = this.game.height;
            this.bg.width = this.game.width;
        }
        if (this.nextLevel == 3)
        {
            this.bg = this.game.add.sprite(0, 0, 'level-three');
            this.bg.x = 0;
            this.bg.y = 0;
            this.bg.height = this.game.height;
            this.bg.width = this.game.width;
        }
        if (this.nextLevel == 4)
        {
            this.bg = this.game.add.sprite(0, 0, 'level-four');
            this.bg.x = 0;
            this.bg.y = 0;
            this.bg.height = this.game.height;
            this.bg.width = this.game.width;
        }
        if (this.nextLevel == 5)
        {
            this.bg = this.game.add.sprite(0, 0, 'level-five');
            this.bg.x = 0;
            this.bg.y = 0;
            this.bg.height = this.game.height;
            this.bg.width = this.game.width;
        }
        if (this.nextLevel == 0) {
            this.bg = this.game.add.sprite(0, 0, 'end');
            this.bg.x = 0;
            this.bg.y = 0;
            this.bg.height = this.game.height;
            this.bg.width = this.game.width;
        }
    },
    
    // Typical update function
    update: function () {
        // Call the game if they click the screen
        if (this.game.input.activePointer.isDown) {
            if (this.nextLevel == 1) {
                this.game.state.start('levelOne');
            }
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
            if (this.nextLevel == 0) {
                this.game.state.start('start');
            }
                
        }
    },
};