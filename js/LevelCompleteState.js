var LevelCompleteState = {
    
    create: function () {
        
        // Story elements between levels   
        switch (this.nextLevel)
        {
            case 1:
                this.bg = this.game.add.sprite(0, 0, 'level-one');
                break;
            case 2:
                this.bg = this.game.add.sprite(0, 0, 'level-two');
                break;
            case 3:
                this.bg = this.game.add.sprite(0, 0, 'level-two');
                break;
            case 4:
                this.bg = this.game.add.sprite(0, 0, 'level-two');
                break;
            case 5:
                this.bg = this.game.add.sprite(0, 0, 'level-two');
                break;
            case 6:
                this.bg = this.game.add.sprite(0, 0, 'level-two');
                break;
        }
        this.bg.x = 0;
        this.bg.y = 0;
        this.bg.height = this.game.height;
        this.bg.width = this.game.width;
    },
    
    // Typical update function
    update: function () {
        // Call the game if they click the screen
        if (this.game.input.activePointer.isDown) {
            switch (this.nextLevel)
            {
                case 0:
                    this.game.state.start('start');
                    break;
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