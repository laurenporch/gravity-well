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
        this.platform = this.platforms.create(100, 480, 'platform');
        this.platform.scale.setTo(.1,1);
        this.platform.body.immovable = true;
        
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
        
        // Turn on the arcade physics engine for this sprite.
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        
        // Make it bounce off of the world bounds.
        this.player.body.collideWorldBounds = true;
        
        // Create a timer
        // this.game.time.events.repeat(2000, 15, GameState.createBall, this);
        
        // Boolean for gravity
        this.gravityIsNormal = true;
        
        //  The controls.
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        // Flip gravity every 10 seconds
        this.game.time.events.loop(Phaser.Timer.SECOND * 10, GameState.flipGravity, this);
    },
    
    update: function () {
        //  Collide the player and the stars with the platforms
        this.game.physics.arcade.collide(this.player, this.platforms);

        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown) {
            //  Move to the left
            this.player.body.velocity.x = -150;
            if (this.gravityIsNormal) {
                this.player.animations.play('leftNormal');
            }
            else {
                this.player.animations.play('leftReverse');
            }
        }
        else if (this.cursors.right.isDown) {
            //  Move to the right
            this.player.body.velocity.x = 150;
            if (this.gravityIsNormal) {
                this.player.animations.play('rightNormal');
            }
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

        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.touching.down && this.gravityIsNormal) {
            this.player.body.velocity.y = -350;
            this.jump.play();
        }
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