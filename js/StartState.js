var StartState = {
    
    // The preload function for StartState
    preload: function() {
        // Load images for main gameplay
        this.game.load.image('logo', 'assets/phaser.png');
    },
    
    create: function () {
        // Starting physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Set the background color
        this.game.stage.backgroundColor = '#000000';
        
        // Add a "click to start" button message
        var clickText = this.game.add.text(100, 100, 'click to start', { fontSize: '50px', fill: '#ffffff' });
    },

    // Typical update function
    update: function () {
        // Call the game if they click the screen
        if (this.game.input.activePointer.isDown) {
            this.game.state.start('play');
        }
    },
};