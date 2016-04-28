var MainMenuState = {
    
    create: function () {
        // Set background
        this.bg = this.game.add.sprite(0, 0, 'bg');
        this.bg.x = 0;
        this.bg.y = 0;
        this.bg.height = this.game.height;
        this.bg.width = this.game.width;
        
        // Add text
        var arrowKeysPic = this.game.add.text(100, 100, 'This is the main menu!', { fontSize: '50px', fill: '#ffffff' });
        var companionCubePic = this.game.add.text(100, 200, 'Move left', { fontSize: '50px', fill: '#ffffff' });
        var gatePic = this.game.add.text(100, 300, 'Move right', { fontSize: '50px', fill: '#ffffff' });
        var jumpPic = this.game.add.text(100, 400, 'Jump up if on ground, jump down if on ceiling', { fontSize: '50px', fill: '#ffffff' });
        var buttonPic = this.game.add.text(100, 500, 'Press \'r\' to return to the starting page.', { fontSize: '50px', fill: '#ffffff' });
        
        this.menuKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        this.menuKey.onDown.add(MainMenuState.goToStart, this);
    },
    
    goToStart: function() {
        this.game.state.start('start');
    }
};