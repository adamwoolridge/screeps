module.exports = {
        run: function(room)
        {
            console.log("Running room init.")

            if (Memory.roadsToSourcesPlaced == undefined)
                placeRoadsToSources(room);
        }
};


// path find from the room spawner to all sources in the room, then trace the routes, placing roads along the way
function placeRoadsToSources(room)
{
    var sources = room.find(FIND_SOURCES);
    var spawn = room.find(FIND_MY_SPAWNS)[0];

    for (let i=0; i<sources.length; i++)
    {
        var path = spawn.pos.findPathTo(sources[i].pos,  {ignoreCreeps: true});

        for (let p=0; p<path.length; p++)
        {
            room.createConstructionSite(path[p].x, path[p].y, STRUCTURE_ROAD);
        }
    }

    Memory.roadsToSourcesPlaced = true;
    console.log("Placed roads to " + sources.length + " sources.")
}

function pickExtensionLocations()
{

    //console.log(sources);

    // var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType==STRUCTURE_EXTENSION || s.structureType==STRUCTURE_SPAWN) && s.energy < s.energyCapacity});
    //
    // if (structure != undefined)
    // {
}
