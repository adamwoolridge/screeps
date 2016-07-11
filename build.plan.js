
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
        var nextToBuild = undefined;

        // Build a list of all the structures we already have
        var existingStructures = [];
        for (let s in Game.structures)
        {
            var structure = Game.structures[s];
            existingStructures.push(structure.structureType);
        }

        // console.log("Existing structures:")
        // console.log(existingStructures);

        // Now put all the planned structures upto the current CL(including ones that may have been built) into an array
        var planStructures = [];
        for (let i=0; i<buildPlan.length; i++)
        {
            for (let z=0; z<buildPlan[i].structures.length; z++)
                planStructures.push(buildPlan[i].structures[z]);
        }

        // console.log("Plan structures:")
        // console.log(planStructures);

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
                //console.log("Next to build: " + nextToBuild);
                break;
            }
        }

        return nextToBuild;
    }
};
