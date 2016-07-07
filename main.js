var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var rolerRepairer = require('role.repairer');
var spawner = require('spawner');
var utils = require('utils');

module.exports.loop = function ()
{
    utils.clearMemory();
    
    spawner.run(Game.spawns.Spawn1);

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
};