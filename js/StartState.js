var StartState = {
    
    // The preload function for StartState
    preload: function() {
        // Load images and sound for main gameplay
        this.game.load.image('bg', 'assets/space.png');
        this.game.load.spritesheet('player', 'assets/astronaut.png', 32, 32);
        this.game.load.spritesheet('exit', 'assets/door-sprite.png', 32, 48);
        this.game.load.image('platform', 'assets/platform.png');
        this.game.load.image('crate', 'assets/companion_cube.png');
        this.game.load.audio('jump', 'assets/jump.wav');
        
        
        //Loading done by Luke for Level 2 Map
        this.game.load.tilemap('LevelTwoMap', 'assets/LevelTwoMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/platform.png');
        
    },
    
    create: function () {
        // Starting physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Set the background color
        this.game.stage.backgroundColor = '#000000';
        
        // Add a "click to start" button message
        var clickText = this.game.add.text(100, 100, 'click to start', { fontSize: '50px', fill: '#ffffff' });
        var clickText = this.game.add.text(100, 200, 'something strange is going on here...', { fontSize: '50px', fill: '#ffffff' });
    },

    // Typical update function
    update: function () {
        // Call the game if they click the screen
        if (this.game.input.activePointer.isDown) {
            this.game.state.start('levelOne');
        }
    },
};