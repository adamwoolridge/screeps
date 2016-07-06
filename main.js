var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function ()
{
    // Clear memory
    for (let name in Memory.creeps)
    {
        if (Game.creeps[name] == undefined)
            delete Memory.creeps[name];
    }

    for (let name in Game.creeps)
    {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester')
            roleHarvester.run(creep);
        else if (creep.memory.role == 'upgrader')
            roleUpgrader.run(creep);
    }

    var minHarvesters = 10;
    var numOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');

    var name = undefined;

    if (numOfHarvesters < minHarvesters)
    {
        name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'harvester', working: false} );
    }
    else
    {
        name = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined, { role: 'upgrader', working: false} );
    }
    
    if (_.isString(name))
        console.log('Spawned new ' + Memory.creeps[name].role + ' called ' + name);
};