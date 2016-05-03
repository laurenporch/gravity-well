var LevelSixState = {
    
    create: function () {
        this.gravitySideways = false;
        this.switchTouched = false;
        this.touchingCrate = false;
        this.game.physics.startSystem(game, Phaser.Physics.ARCADE);
        
        // Create the background and set it to the size of the game screen
        this.bg = this.game.add.tileSprite(0, 0, 1600, 1600,'bg');
        this.bg.x = 0;
        this.bg.y = 0;
        //this.bg.height = 1600;
        //this.bg.width = 608;
        
        //adds the Map from LevelThreeMap.json
        this.map = this.game.add.tilemap('LevelSixMap');
        this.map.addTilesetImage('platform', 'tiles');

        this.layer = this.map.createLayer('Tile Layer 1');

        
        //Should make the world the same size as the tilemap
        this.layer.resizeWorld();
        
        //Sets the specific tile in the tileset to have collisions with
        this.map.setCollision(1);
        

        // Add jump sound
        this.jump = this.game.add.audio('jump');
        
        // Make Switch
        this.gravitySwitch = this.game.add.sprite(6*32, 7.5*32, 'gravitySwitch');
        this.gravitySwitch.anchor.setTo(.5, .5);
        this.game.physics.arcade.enable(this.gravitySwitch);
        this.gravitySwitch.body.immovable = true;
        
        // Make crate
        this.crate = this.game.add.sprite(32*45, 32*5, 'crate');
        
        this.crate.scale.setTo(.8,.8);
        this.game.physics.arcade.enable(this.crate);
        this.crate.body.collideWorldBounds = true;
        this.crate.body.gravity.y = 640;
        this.crate.body.mass = .5;
        
        // Make player
        this.player = this.game.add.sprite(128, 64, 'player');
        this.player.anchor.setTo(.5, .5);
        this.game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 640;
        this.player.body.collideWorldBounds = false;
        this.player.checkWorldBounds = true;
        this.player.outOfBoundsKill = true;
        this.game.camera.follow(this.player);
        

        //  Walking left and right animations for normal gravity
        this.player.animations.add('leftNormal', [3,4,5], 7, true);
        this.player.animations.add('rightNormal', [6,7, 8], 7, true);
        // Left and right animations for reversed gravity
        this.player.animations.add('leftReverse', [20,19,18], 7, true);
        this.player.animations.add('rightReverse', [15,16, 17], 7, true);
        
        // Create the exit door
        this.door = this.game.add.sprite(32*49, 32*42, 'exit');
        this.door.scale.y *= 1.25;
        this.door.animations.add('open', [3,2,1,0], 5, true);
        this.game.physics.arcade.enable(this.door);
        this.door.enableBody = true;
        this.door.body.immovable = true;
        
        // Create the button for the crate to push down
        this.button = this.game.add.sprite(32*7, 32*15, 'platform');
        this.button.angle = 90;
        this.button.scale.setTo(.1, .1);
        this.button.enableBody = true;
        this.game.physics.arcade.enable(this.button);
        
        // Boolean for gravity and open door
        this.gravityIsNormal = true;
        this.doorIsOpen = false;
        
        //  The controls.
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        // Flip gravity every 5 seconds
        this.game.time.events.loop(Phaser.Timer.SECOND * 5, LevelSixState.flipGravity, this);
    },
    
    update: function () {
        //  Collide the player, crate, button, door, and platforms accordingly
        //this.game.physics.arcade.collide(this.player, this.crate);
        this.touchingCrate = false;
        this.game.physics.arcade.collide(this.player, this.crate, this.PlayerCrateCollision, this.ProcessCollback, this);
        this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.collide(this.crate, this.layer);
        this.game.physics.arcade.collide(this.player, this.door, LevelSixState.Win, null, this);
        //this.switchTouched = false;
        this.game.physics.arcade.collide(this.player, this.gravitySwitch, this.SwitchGravity, this.ProcessCollback, this);
        
        // Every update should reset player velocity
        if (this.gravitySideways) {
            this.player.body.velocity.y = 0;
            this.crate.body.velocity.y = 0;
        }
        else {
            this.player.body.velocity.x = 0;
            this.crate.body.velocity.x = 0;
        }
        
        
        // Set door frame (ba-dum-chi)
        this.door.frame = 3;
        this.doorIsOpen =false;
        
        // Open door if it is pushing down the button, close door if not
        this.game.physics.arcade.overlap(this.crate, this.button, LevelSixState.openDoor, null, this);
        
        //move crate with player if shift is pressed
         var gameobj = this
         this.game.input.keyboard.onDownCallback = function(e) {
             console.log(e.keyCode);
             if (e.keyCode == 16 && gameobj.touchingCrate == true)
             {
                 gameobj.pulling = true;
             }
         };
         this.game.input.keyboard.onUpCallback = function(e) {
            console.log(e.keyCode);
             if (e.keyCode == 16)
             {
                 gameobj.pulling = false;
             }
         };
        if (this.pulling)
            this.pulling = (this.gravitySideways) ? Math.abs(this.player.body.x - this.crate.body.x) <= 32 : Math.abs(this.player.body.y - this.crate.body.y) <= 32;
        
        
        if(this.player.alive==false)
        {
            this.Lose();
        }
        
        if (this.gravitySideways) {
            if (this.cursors.up.isDown) {
                //  Move to the left on ground
                this.player.body.velocity.y = -150;
                if (this.pulling)
                   this.crate.body.velocity.y = -150;
                if (this.gravityIsNormal) {
                    this.player.animations.play('leftNormal');
                }
                // Animation for walking left on ceiling
                else {
                    this.player.animations.play('leftReverse');
                }
            }
            else if (this.cursors.down.isDown) {
                //  Move to the right on ground
                this.player.body.velocity.y = 150;
                if (this.pulling)
                   this.crate.body.velocity.y = 150;
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
            if (this.cursors.left.isDown && (this.player.body.blocked.right || this.player.body.touching.right) && !this.gravityIsNormal) {
                this.player.body.velocity.x = -350;
                this.jump.play();
                this.pulling = false;
            }
            // Allow the player to "jump" if they are touching the ceiling
            else if (this.cursors.right.isDown && (this.player.body.blocked.left ||this.player.body.touching.left) && (this.gravityIsNormal)) {
                this.player.body.velocity.x = 350;
                this.jump.play();
                this.pulling = false;
            }
        }
        else {
            if (this.cursors.left.isDown) {
                //  Move to the left on ground
                this.player.body.velocity.x = -150;
                if (this.pulling)
                   this.crate.body.velocity.x = -150;
                if (this.gravityIsNormal) {
                    this.player.animations.play('leftNormal');
                }
                // Animation for walking left on ceiling
                else {
                    this.player.animations.play('leftReverse');
                }
            }
            else if (this.cursors.right.isDown) {
                //  Move to the right on ground
                this.player.body.velocity.x = 150;
                if (this.pulling)
                   this.crate.body.velocity.x = 150;
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
            if (this.cursors.up.isDown && (this.player.body.onFloor() || this.player.body.touching.down) && this.gravityIsNormal) {
                this.player.body.velocity.y = -350;
                this.jump.play();
                this.pulling = false;
            }
            // Allow the player to "jump" if they are touching the ceiling
            else if (this.cursors.down.isDown && (this.player.body.blocked.up ||this.player.body.touching.up) && !(this.gravityIsNormal)) {
                this.player.body.velocity.y = 350;
                this.jump.play();
                this.pulling = false;
            }
        }
    },
    
    render: function() {
        this.game.debug.text("Next flip: " + this.game.time.events.duration.toFixed(0), 32, 50);
    },
    
    
    playMusic: function () {
        // this.bgs.play('', 0, 1, true);
    },
    
    
    flipGravity: function () {
        if (this.gravitySideways) {
            this.player.body.gravity.x *= -1;
            this.crate.body.gravity.x *= -1;
        }
        else {
            this.player.body.gravity.y *= -1;
            this.crate.body.gravity.y *= -1;
        }
        this.gravityIsNormal = !this.gravityIsNormal;
    },
    
    openDoor: function () {
        this.door.frame = 1;
        this.doorIsOpen = true;
    },
    
    Win: function () {
        // Only go to the next state if conditions are right for the door to be open
        if (this.doorIsOpen) {
            this.door.animations.play('open');
            this.game.state.states['levelComplete'].nextLevel = 0;
            this.game.state.start('levelComplete');
        }
    },
    
    PlayerCrateCollision: function (obj1, obj2) {
         this.touchingCrate = true;
     },
     
     ProcessCallback: function (obj1, obj2) {
         return true;
     },
    
    SwitchGravity: function (obj1, obj2) {
        if (this.switchTouched == false) {
            this.gravitySideways = !this.gravitySideways;
            this.gravitySwitch.scale.x *= -1;
            this.player.angle = 90;
            if (this.gravitySideways) {
                this.crate.body.gravity.y = 0;
                this.player.body.gravity.y = 0;
                this.crate.body.gravity.x = (this.gravityIsNormal) ? -640 : 640;
                this.player.body.gravity.x = (this.gravityIsNormal) ? -640 : 640;
            }
            else {
                this.crate.body.gravity.y = (this.gravityIsNormal) ? -640 : 640;
                this.player.body.gravity.y = (this.gravityIsNormal) ? -640 : 640;
                this.crate.body.gravity.x = 0;
                this.player.body.gravity.x = 0;
            }
            this.switchTouched = true;
        }
    },
    
    Lose: function () {
        this.game.state.states['lose'].lastState = 6;
        this.game.state.start('lose');
    },
    
};