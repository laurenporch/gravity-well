var LoseState = {
    
    create: function () {
        // Set background
        this.game.stage.backgroundColor = '#000000';
        
        // Add text
        var youLost = this.game.add.text(100, 100, 'You lost!', { fontSize: '50px', fill: '#ffffff' });
    },
};