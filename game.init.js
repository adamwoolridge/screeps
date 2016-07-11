var roomInit = require('room.init');

module.exports = {
    run: function(spawner)
    {
        console.log("Running game init.");
        
        initStartingRoom(spawner.room);

        Memory.GameInitd = true;
    }
};

function initStartingRoom(room)
{
    roomInit.run(room)
}
