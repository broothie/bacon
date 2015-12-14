/* game.js */

$(window).resize(function(){
    window.resizeGame();
});

function resizeGame(){
    var height = $(window).height();
    var width = $(window).width();

    game.width = width;
    game.height = height;
    game.world.bounds.width = width;
    game.world.bounds.height = height;

    if(game.renderType === Phaser.WEBGL){
    	game.renderer.resize(width, height);
    }
}

// Game globals
var protagonist;
var playerList;
var land;
var cursors;
var bulletTime = 0;

var game = new Phaser.Game($(window).width(), $(window).height(), Phaser.AUTO, 'phaser-example', {
// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
    preload: preload,
    create: eurecaClientSetup,
    update: update
});

// Loads assets
function preload(){
    game.load.image('background', 'assets/grid.png');
    game.load.image('bullet', 'assets/bullets.png');
    game.load.image('pig', 'assets/pig.png');
    game.load.image('bacon', 'assets/bacon.png');
}

// Builds/initializes game world
function create(gameSize, playerX, playerY){
    // Must make size of game world
    // game.world.setBounds(-gameSize/2, -gameSize/2, gameSize, gameSize);
    game.world.setBounds(-gameSize/2, -gameSize/2, gameSize, gameSize);
    // Not sure what this does
    game.stage.disableVisibilityChange = true;

    // Tiled background
    land = game.add.tileSprite(0, 0, $(window).width(), $(window).height(), 'background');
    land.fixedToCamera = true;

    // Protagonist setup
    protagonist = new Player(game, myFingerprint, myUsername, playerX, playerY);
    playerList = {};
    playerList[myFingerprint] = protagonist;
    sprite = protagonist.sprite;
    sprite.bringToTop();

    // Camera setup
    game.camera.follow(sprite);
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;

    // Control setup
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
}

// Game loop
function update(){
    // Don't start game loop until client is ready
    if(!ready) return;

    // Give protagonist new input values
    protagonist.input.up = cursors.up.isDown;
    protagonist.input.down = cursors.down.isDown;
    protagonist.input.left = cursors.left.isDown;
    protagonist.input.right = cursors.right.isDown;
    protagonist.input.fire = game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
    protagonist.input.tx = game.input.x + game.camera.x;
    protagonist.input.ty = game.input.y + game.camera.y;
    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;

    // Update all the players
    for(var key in playerList){ if(playerList.hasOwnProperty(key)){
        if(playerList[key]) playerList[key].update();
    }}
}
