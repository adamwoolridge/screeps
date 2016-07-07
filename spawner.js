module.exports = {

    run: function(spawner)
    {
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