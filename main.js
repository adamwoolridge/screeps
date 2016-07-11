var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var rolerRepairer = require('role.repairer');
var spawner = require('spawner');
var utils = require('utils');
var buildPlan = require('build.plan');
var gameInit = require('game.init');

module.exports.loop = function ()
{
    if (newGame())
        return;

    if (Memory.GameInitd == false)
         gameInit.run(Game.spawns.Spawn1);
    
    utils.clearMemory();
    
    spawner.run(Game.spawns.Spawn1);

    buildPlan.run((Game.spawns.Spawn1));
    
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
    }
};

function newGame()
{
    return false; // uncomment this line when respawning

    for(i in Memory){ Memory[i] = undefined; };
    console.log('New game clearing. Comment this code again.')

    Memory.GameInitd = false;
    return true;
}