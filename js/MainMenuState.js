var MainMenuState = {
    
    create: function () {
        // Set background
        this.bg = this.game.add.sprite(0, 0, 'controlscreen');
        this.bg.x = 0;
        this.bg.y = 0;
        this.bg.height = this.game.height;
        this.bg.width = this.game.width;
        
        this.menuKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        this.menuKey.onDown.add(MainMenuState.goToStart, this);
    },
    
    goToStart: function() {
        this.game.state.start('start');
    }
};