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
        this.game.load.image('controlscreen', 'assets/controls-screen.png')
        this.game.load.audio('bgsound', 'assets/Quirky-Stroll.mp3');

        
        //Loading done by Luke for Level 2 Map
        this.game.load.tilemap('LevelTwoMap', 'assets/LevelTwoMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/platform.png');
        
        //Loading done by Luke for Level 3,4,5 Map
        this.game.load.tilemap('LevelThreeMap', 'assets/LevelThreeMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('LevelFourMap', 'assets/LevelFourMap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('LevelFiveMap', 'assets/LevelFiveMap.json', null, Phaser.Tilemap.TILED_JSON);        
    },
    
    create: function () {
        // Starting physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Set the background
        this.bg = this.game.add.sprite(0, 0, 'bg');
        this.bg.x = 0;
        this.bg.y = 0;
        this.bg.height = this.game.height;
        this.bg.width = this.game.width;
        
        // Create the background music
        // Only sort of loops correctly...
        // (bgs.loop = true) didn't work
        this.bgs = this.game.add.audio('bgsound');
        this.bgs.play('', 0, 1, true);
        this.bgs.onLoop.add(StartState.playMusic, this);
        
        // Add a "click to start" button message
        var clickText = this.game.add.text(100, 100, 'Press \'s\' to start', { fontSize: '50px', fill: '#ffffff' });
        var storyText = this.game.add.text(100, 200, 'something strange is going on here...', { fontSize: '50px', fill: '#ffffff' });
        var controlsText = this.game.add.text(100, 300, 'Press \'c\' for controls', { fontSize: '50px', fill: '#ffffff' });
        
        // Add start key
        var startKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        startKey.onDown.add(StartState.startGame, this);
        
        // Add menu key
        this.menuKey = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
        this.menuKey.onDown.add(StartState.goToMenu, this);
    },
    
    startGame: function() {
        this.game.state.start('levelOne');
    },
    
    goToMenu: function() {
        this.game.state.start('mainMenu');
    },
    
    playMusic: function () {
        this.bgs.play('', 0, 1, true);
    },
};