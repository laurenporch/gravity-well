var GameState = {
    
    create: function () {
        // Create the background and set it to the size of the game screen
        this.bg = this.game.add.sprite(0, 0, 'bg');
        this.bg.x = 0;
        this.bg.y = 0;
        this.bg.height = this.game.height;
        this.bg.width = this.game.width;
        
        // Create the background music
        // Only sort of loops correctly. Having issues with Chrome?
        // (bgs.loop = true) didn't work
        // this.bgs = this.game.add.audio('bgsound');
        // this.bgs.play('', 0, 1, true);
        // this.bgs.onLoop.add(GameState.playMusic, this);
        
        // Add jump sound
        this.jump = this.game.add.audio('jump');
        
        // The group for platforms.
        this.platforms = this.game.add.group();

        //  Enable physics for platforms.
        this.platforms.enableBody = true;

        // Create the ground.
        this.ground = this.platforms.create(0, this.game.world.height - 32, 'platform');
        this.ground.scale.setTo(2,1);
        this.ground.body.immovable = true;
        
        // Create the ceiling.
        this.ceiling = this.platforms.create(0, 0, 'platform');
        this.ceiling.scale.setTo(2,1);
        this.ceiling.body.immovable = true;

        // Create ledges.
        this.platform = this.platforms.create(100, 450, 'platform');
        this.platform.scale.setTo(.15,1);
        this.platform.body.immovable = true;
        
        this.platform = this.platforms.create(280, 250, 'platform');
        this.platform.scale.setTo(.5,1);
        this.platform.body.immovable = true;
        
        this.platform = this.platforms.create(280, 400, 'platform');
        this.platform.scale.setTo(.5,1);
        this.platform.body.immovable = true;
        
        this.platform = this.platforms.create(600, 150, 'platform');
        this.platform.scale.setTo(.25,1);
        this.platform.body.immovable = true;
        
        // Make crate
        this.crate = this.game.add.sprite(300, 300, 'crate');
        this.crate.scale.setTo(.8,.8);
        this.game.physics.arcade.enable(this.crate);
        this.crate.body.collideWorldBounds = true;
        
        // Make player
        // The player and its settings
        this.player = this.game.add.sprite(32, this.game.world.height - 150, 'player');

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 640;
        this.player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right, for normal gravity
        this.player.animations.add('leftNormal', [3,4,5], 7, true);
        this.player.animations.add('rightNormal', [6,7, 8], 7, true);
        this.player.animations.add('leftReverse', [20,19,18], 7, true);
        this.player.animations.add('rightReverse', [15,16, 17], 7, true);
        
        // Create a timer to spawn the balls
        // this.game.time.events.repeat(2000, 15, GameState.createBall, this);
        
        // Boolean for gravity
        this.gravityIsNormal = true;
        
        //  The controls.
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        // Flip gravity every 5 seconds
        this.game.time.events.loop(Phaser.Timer.SECOND * 5, GameState.flipGravity, this);
    },
    
    update: function () {
        //  Collide the player and the stars with the platforms
        this.game.physics.arcade.collide(this.player, this.platforms);

        //  Reset the player's velocity ONLY when touching ground or ceiling
        // Maintain movement if jumping/falling
        if (this.player.body.touching.down || this.player.body.touching.up) {
            this.player.body.velocity.x = 0;
        }

        if (this.cursors.left.isDown && (this.player.body.touching.down || this.player.body.touching.up)) {
            //  Move to the left on ground
            this.player.body.velocity.x = -150;
            if (this.gravityIsNormal) {
                this.player.animations.play('leftNormal');
            }
            // Animation for walking left on ceiling
            else {
                this.player.animations.play('leftReverse');
            }
        }
        else if (this.cursors.right.isDown && (this.player.body.touching.down || this.player.body.touching.up)) {
            //  Move to the right on ground
            this.player.body.velocity.x = 150;
            if (this.gravityIsNormal) {
                this.player.animations.play('rightNormal');
            }
            // Animation for walking right on ceiling
            else {
                this.player.animations.play('rightReverse');
            }
        }
        else {
            //  Stand still
            this.player.animations.stop();
            if (this.gravityIsNormal) {
                this.player.frame = 1;
            }
            else {
                this.player.frame = 22;
            }
        }

        //  Allow the player to jump if they are touching the ground
        if (this.cursors.up.isDown && this.player.body.touching.down && this.gravityIsNormal) {
            this.player.body.velocity.y = -350;
            this.jump.play();
        }
        // Allow the player to "jump" if they are touching the ceiling
        else if (this.cursors.down.isDown && this.player.body.touching.up && !(this.gravityIsNormal)) {
            this.player.body.velocity.y = 350;
            this.jump.play();
        }
    },
    
    render: function() {
        this.game.debug.text("Time until gravity flips: " + this.game.time.events.duration.toFixed(0), 32, 50);
    },
    
    playMusic: function () {
        // this.bgs.play('', 0, 1, true);
    },
    
    flipGravity: function () {
        this.player.body.gravity.y *= -1;
        this.gravityIsNormal = (this.gravityIsNormal) ? false : true;
    },
    
    Win: function () {
        this.game.state.start('win');
    },
    
    Lose: function () {
        this.game.state.start('lose');
    },
};