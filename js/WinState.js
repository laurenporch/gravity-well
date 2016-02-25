var WinState = {
    
    create: function () {
        // Set background
        this.game.stage.backgroundColor = '#000000';
        
        // Add text
        var youWon = this.game.add.text(100, 100, 'You won!', { fontSize: '50px', fill: '#ffffff' });
    },
};