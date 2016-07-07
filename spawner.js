// Role definitions
var roles = [{
    name: 'harvester',
    templates: [{
        priority: 0,
        min: 6,
        body: [WORK, WORK, CARRY, MOVE]
    }, {
        priority: 0,
        min: 4,
        body: [WORK, WORK, WORK, CARRY, CARRY, MOVE]
    }]
}, {
    name: 'upgrader',
    templates: [{
        priority: 1,
        min: 3,
        body: [WORK, CARRY, MOVE, MOVE]
    }, {
        priority: 1,
        min: 2,
        body: [WORK, WORK, WORK, CARRY, CARRY, MOVE]
    }]
}]


function whatToSpawn(spawner)
{
    var cl = spawner.room.controller.level;

    for (let i=0; i<roles.length; i++)
    {
        var role = roles[i];

        // Get the spawn template for this role, based on the current control level
        var template = role.templates[Math.min(role.templates.length, cl)-1];

        // How many of this role do we already have?
        var roleCreepCount = _.sum(Game.creeps, (c) => c.memory.role == role.name);

        // Do we want more of this role for the current CL template?
        if (roleCreepCount < template.min)
        {
            //console.log("Next to spawn: " + role.name);

            // if we can spawn, spawn and return
            return;
        }
    }
}

module.exports = {

    run: function(spawner)
    {
        whatToSpawn(spawner);

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
            name = spawner.createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'harvester', working: false} );
        }
        else if (numOfUpgraders < minUpgraders)
        {
            name = spawner.createCreep([WORK, CARRY, MOVE, MOVE], undefined, { role: 'upgrader', working: false} );
        }
        else if (numOfRepairers < minRepairers)
        {
            name = spawner.createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'repairer', working: false} );
        }
        else if (numOfBuilders < minBuilders)
        {
            name = spawner.createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'builder', working: false} );
        }


        if (_.isString(name))
            console.log('Spawned new ' + Memory.creeps[name].role + ' called ' + name);
    }
};