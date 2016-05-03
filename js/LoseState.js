var LoseState = {
    
    create: function () {
        // Create the background and set it to the size of the game screen
            this.bg = this.game.add.sprite(0, 0, 'die-screen');
            this.bg.x = 0;
            this.bg.y = 0;
            this.bg.height = this.game.height;
            this.bg.width = this.game.width;
    },
    
    // Typical update function
    update: function () {
        // Call the game if they click the screen
        if (this.game.input.activePointer.isDown) {
            if (this.lastState ==1)
            {
                this.game.state.start('levelOne');
            }    
            if (this.lastState == 2)
            {
                this.game.state.start('levelTwo');
            }
            if (this.lastState == 3)
            {
                this.game.state.start('levelThree');
            }
            if (this.lastState == 4)
            {
                this.game.state.start('levelFour');
            }
            if (this.lastState == 5)
            {
                this.game.state.start('levelFive');
            }
        }
    },
};