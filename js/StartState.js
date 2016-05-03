var StartState = {
    
    // The preload function for StartState
    preload: function() {
        // Load images and sound for main gameplay
        this.game.load.image('bg', 'assets/space.png');
        this.game.load.image('mainmenu', 'assets/main-menu.png');
        this.game.load.spritesheet('player', 'assets/astronaut.png', 32, 32);
        this.game.load.spritesheet('exit', 'assets/door-sprite.png', 32, 48);
        this.game.load.image('platform', 'assets/platform.png');
        this.game.load.image('crate', 'assets/companion_cube.png');
        this.game.load.audio('jump', 'assets/jump.wav');
        this.game.load.image('controlscreen', 'assets/controls-screen.png')
        this.game.load.audio('bgsound', 'assets/Quirky-Stroll.mp3');
        this.game.load.image('spaceship', 'assets/spaceship.png');
        this.game.load.image('level-one', 'assets/start-level.png');
        this.game.load.image('level-two', 'assets/level-one-complete.png');
        this.game.load.image('level-three', 'assets/level-two-complete.png');
        this.game.load.image('level-four', 'assets/level-three-complete.png');
        this.game.load.image('level-five', 'assets/level-four-complete.png');
        this.game.load.image('end', 'assets/level-five-complete.png');
        
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
        
        // Set scrolling background image
        this.bg = this.game.add.tileSprite(0, 0, this.game.width, this.game.cache.getImage('bg').height, 'bg');
        
        // Set main menu text
        mainMenu = this.game.add.sprite(0, 0, 'mainmenu');
        mainMenu.x = 0;
        mainMenu.y = 0;
        mainMenu.height = this.game.height;
        mainMenu.width = this.game.width;
        
        // Add the spaceship
        spaceship = this.game.add.sprite(230, 170, 'spaceship');
        
        // Create the background music
        // Only sort of loops correctly...
        // (bgs.loop = true) didn't work
        this.bgs = this.game.add.audio('bgsound');
        this.bgs.play('', 0, 1, true);
        this.bgs.onLoop.add(StartState.playMusic, this);
        
        // Add start key
        var startKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        startKey.onDown.add(StartState.startGame, this);
        
        // Add menu key
        this.menuKey = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
        this.menuKey.onDown.add(StartState.goToMenu, this);
    },
    
    update: function() {
        // For scrolling background
        this.bg.tilePosition.y += 1;
    },
    
    startGame: function() {
        this.game.state.states['levelComplete'].nextLevel = 1;
            this.game.state.start('levelComplete');
    },
    
    goToMenu: function() {
        this.game.state.start('mainMenu');
    },
    
    playMusic: function () {
        this.bgs.play('', 0, 1, true);
    },
};