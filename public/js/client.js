/* client.js */

// Server globals
var myFingerprint;
var eurecaServer;
var ready = false;

var eurecaClientSetup = function(){
    // Create instance of Eureca client
    var eurecaClient = new Eureca.Client();
    // Get reference to server through `eurecaServer` object
    eurecaClient.ready(function(proxy){
        eurecaServer = proxy;
    });


    /* Exported methods for use on server */

    /** setId
     * Called once by server in server event handler `onConnect`
     * `fingerprint` is created by Eureca library somehow and used as a connection ID
     */
    eurecaClient.exports.setFingerprint = function(fingerprint){
        myFingerprint = fingerprint;
        console.log("Fingerprint set to: ", myFingerprint);
        create();
        eurecaServer.handshake();
        ready = true;
    };

    /** clientDisconnect
     * Called by server in server event handler `onDisconnect`
     * Called on each client since the server has to inform them of a player leaving
     */
    eurecaClient.exports.clientDisconnect = function(peerFingerprint){
        if(playerList[peerFingerprint]){
            console.log("Killing %s", playerList[peerFingerprint]);
            playerList[peerFingerprint].kill();
        }
    };

    /** spawnEnemy
     * Called by server in server method `handshake`
     * Called on each client to spawn the newly joined player
     */
    eurecaClient.exports.spawnEnemy = function(peerFingerprint, x, y){
        // Guard against spawning client's self
        if(myFingerprint == peerFingerprint) return;
        console.log(myFingerprint, "spawning player on", peerFingerprint);
        // Add new player to player list
        playerList[peerFingerprint] = new Player(peerFingerprint, game);
        console.log("Enemy spawned");
    };

    /** updateState
     * Called by server in server method `handleKeys`
     * Called on each client to update their simulation of a player
     */
    eurecaClient.exports.updateState = function(fingerprint, state){
        player = playerList[fingerprint];
        if(player){
            player.cursor = state;
            // Update location data
            player.sprite.x = state.x;
            player.sprite.y = state.y;
            // Update movement data
            player.sprite.body.angularVelocity = state.angularVelocity;
            player.sprite.angle = state.angle;
            player.sprite.rotation = state.rotation;
            player.sprite.currentSpeed = state.currentSpeed;
            player.update();
        }
    };
};
