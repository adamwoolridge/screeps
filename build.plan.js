
var buildPlan = [{
    structures: [   STRUCTURE_EXTENSION,
                    STRUCTURE_EXTENSION,
                    STRUCTURE_EXTENSION,
                    STRUCTURE_EXTENSION,
                    STRUCTURE_EXTENSION ]
}, {
    structures: [   STRUCTURE_EXTENSION ]
}]


module.exports = {
    run: function(spawner)
    {
        pickExtensionLocations();

        var nextToBuild = undefined;

        // Build a list of all the structures we already have
        var existingStructures = [];
        for (let s in Game.structures)
        {
            var structure = Game.structures[s];
            existingStructures.push(structure.structureType);
        }

        console.log("Existing structures:")
        console.log(existingStructures);

        // Now put all the planned structures upto the current CL(including ones that may have been built) into an array
        var planStructures = [];
        for (let i=0; i<buildPlan.length; i++)
        {
            for (let z=0; z<buildPlan[i].structures.length; z++)
                planStructures.push(buildPlan[i].structures[z]);
        }

        console.log("Plan structures:")
        console.log(planStructures);

        // Now go through the plan structures, and remove them from the existing structures list,
        // to see what needs building next. This should allow rebuilding of previously built but destroyed structures too.
        for (let i=0; i<planStructures.length; i++)
        {
            var ps = planStructures[i];

            var index = existingStructures.indexOf(ps);
            if (index>-1)
            {
                existingStructures.splice(index, 1);
            }
            else
            {
                nextToBuild = ps;
                console.log("Next to build: " + nextToBuild);
                break;
            }
        }
        console.log("------------------");

        return nextToBuild;
    }
};

function pickExtensionLocations()
{
    var sources = Game.spawns.Spawn1.room.find(FIND_SOURCES);

    for (let i=0; i<sources.length; i++)
    {
        var path = Game.spawns.Spawn1.pos.findPathTo(sources[i].pos,  {ignoreCreeps: true});

        for (let p=0; p<path.length; p++)
        {
            Game.spawns.Spawn1.room.createConstructionSite(path[p].x, path[p].y, STRUCTURE_ROAD);
        }
        //console.log(path[path.length-2].x, path[path.length-2].y);
    }
    //console.log(sources);

    // var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType==STRUCTURE_EXTENSION || s.structureType==STRUCTURE_SPAWN) && s.energy < s.energyCapacity});
    //
    // if (structure != undefined)
    // {
}