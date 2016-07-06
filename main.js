var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var rolerRepairer = require('role.repairer');

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
        else if (creep.memory.role == 'builder')
            roleBuilder.run(creep);
        else if (creep.memory.role == 'repairer')
            rolerRepairer.run(creep);

        //creep.say(creep.memory.role);
    }

    var minHarvesters = 6;
    var numOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');

    var minUpgraders = 3;
    var numOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');

    var minRepairers = 2;
    var numOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');

    var minBuilders = 5;
    var numOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');

    var name = undefined;

    // console.log('Harvesters: ' + numOfHarvesters);
    // console.log('Upgraders: ' + numOfUpgraders);
    // console.log('Repairers: ' + numOfRepairers);
    // console.log('Builders: ' + numOfBuilders);
    // console.log('-------');

    if (numOfHarvesters < minHarvesters)
    {
        name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'harvester', working: false} );
    }
    else if (numOfUpgraders < minUpgraders)
    {
        name = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined, { role: 'upgrader', working: false} );
    }
    else if (numOfRepairers < minRepairers)
    {
        name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'repairer', working: false} );
    }
    else if (numOfBuilders < minBuilders)
    {
        name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'builder', working: false} );
    }


    if (_.isString(name))
        console.log('Spawned new ' + Memory.creeps[name].role + ' called ' + name);
};