var GameState = {
    
    create: function () {
        // Create a sprite at the center of the screen using the 'logo' image.
        this.bouncy = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.bouncy.scale.setTo(.07,.07);
        
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        this.bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        this.game.physics.enable(this.bouncy, Phaser.Physics.ARCADE);
        // Make it bounce off of the world bounds.
        this.bouncy.body.collideWorldBounds = true;
    },
    
    update: function () {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        this.bouncy.rotation = this.game.physics.arcade.accelerateToPointer(this.bouncy, this.game.input.activePointer, 500, 500, 500);
    },
};