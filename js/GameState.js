var GameState = {
    
    create: function () {
        // Create the background and set it to the size of the game screen (so many colors!)
        var background = this.game.add.sprite(0, 0, 'bg');
        background.x = 0;
        background.y = 0;
        background.height = this.game.height;
        background.width = this.game.width;
        
        // Create the background music
        // Only sort of loops correctly. Having issues with Chrome?
        // (bgs.loop = true) didn't work
        this.bgs = this.game.add.audio('bgsound');
        this.bgs.play('', 0, 1, true);
        this.bgs.onLoop.add(GameState.playMusic, this);
        
        // Create a sprite at the center of the screen
        this.bouncy = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bouncy');
        this.bouncy.scale.setTo(.15,.15);
        
        // Anchor the sprite at its center
        this.bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        this.game.physics.enable(this.bouncy, Phaser.Physics.ARCADE);
        // Make it bounce off of the world bounds.
        this.bouncy.body.collideWorldBounds = true;
        
        // Add group of balls
        this.balls = this.game.add.group();
        this.game.physics.enable(this.balls, Phaser.Physics.ARCADE);
        
        // Create a timer
        this.game.time.events.repeat(2000, 15, GameState.createBall, this);
        
        // Win game if timer gets to 32 seconds
        this.game.time.events.add(Phaser.Timer.SECOND * 32, GameState.Win, this);
    },
    
    update: function () {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        this.bouncy.rotation = this.game.physics.arcade.accelerateToPointer(this.bouncy, this.game.input.activePointer, 500, 500, 500);
        
        // Let bouncy and balls collide, and start lose state if they touch
        this.game.physics.arcade.overlap(this.bouncy, this.balls, GameState.Lose, null, this);
    },
    
    render: function() {
        this.game.debug.text("Time until next event: " + this.game.time.events.duration.toFixed(0), 32, 32);
    },
    
    createBall: function () {
        this.ball = this.balls.create(this.game.world.randomX, this.game.world.randomY, 'ball');
        this.ball.scale.setTo(.21, .21);
        this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);
        this.ball.body.collideWorldBounds = true;
        
        this.ball.body.gravity.y = (1000 * Math.random()) - 500;
        this.ball.body.bounce.y = 1;
        this.ball.body.gravity.x = (1000 * Math.random()) - 500;
        this.ball.body.bounce.x = 1;
    },
    
    playMusic: function () {
        this.bgs.play('', 0, 1, true);
    },
    
    Win: function () {
        this.game.state.start('win');
    },
    
    Lose: function () {
        this.game.state.start('lose');
    },
};