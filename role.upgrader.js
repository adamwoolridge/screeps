module.exports = {
    run: function(creep)
    {
        if (creep.memory.working == true && creep.carry.energy == 0)
        {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity)
        {
            creep.memory.working = true;
        }

        if (creep.memory.working == true)
        {
            if (creep.upgradeController(creep.room.controller)== ERR_NOT_IN_RANGE)
                creep.moveTo(creep.room.controller);
        }
        else
        {
            // Try and take energy from an extension first
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.structureType==STRUCTURE_EXTENSION ) && s.energy > 0});

            if (structure != undefined)
            {
                var min = Math.min(structure.energy, creep.carryCapacity-creep.carry.energy);

                if (structure.transferEnergy(creep,min ) == ERR_NOT_IN_RANGE)
                    creep.moveTo(structure);
            }
            else
            {
                var source = creep.pos.findClosestByPath(FIND_SOURCES);

                if (creep.harvest(source) == ERR_NOT_IN_RANGE)
                    creep.moveTo(source);
            }
        }
    }
};