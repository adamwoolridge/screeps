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
}, {
    name: 'repairer',
    templates: [{
        priority: 1,
        min: 2,
        body: [WORK, WORK, CARRY, MOVE]
    }, {
        priority: 1,
        min: 2,
        body: [WORK, WORK, WORK, CARRY, CARRY, MOVE]
    }]
}, {
    name: 'builder',
    templates: [{
        priority: 1,
        min: 5,
        body: [WORK, WORK, CARRY, MOVE]
    }, {
        priority: 1,
        min: 3,
        body: [WORK, WORK, WORK, CARRY, CARRY, MOVE]
    }]
}]

function spawn(spawner)
{
    var cl = spawner.room.controller.level;
    var energy = spawner.room.energyAvailable;
    var roleToSpawn = undefined;
    var roleTemplateToSpawn = undefined;

    // Emergency check to make sure we always build a harvester if we have none
    var harvesterCount = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    if (harvesterCount == 0)
    {
        roleToSpawn = roles[0];
        roleTemplateToSpawn = bestAffordableRoleTemplate(spawner, roleToSpawn, energy);
    }

    if (roleToSpawn == undefined || roleTemplateToSpawn == undefined)
    {
        roleToSpawn = undefined;
        roleTemplateToSpawn = undefined;

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
                roleToSpawn = role;
                roleTemplateToSpawn = bestAffordableRoleTemplate(spawner, roleToSpawn, energy)
                break;
            }
        }
    }

    if (roleToSpawn != undefined && roleTemplateToSpawn != undefined)
    {
        var name = undefined;

        name = spawner.createCreep(roleTemplateToSpawn.body, undefined, { role: roleToSpawn.name, working: false} );
        if (_.isString(name))
            console.log('Spawned: ' + Memory.creeps[name].role + ' called ' + name + 'with the body: ' + roleTemplateToSpawn.body);
    }
}

// Figure out the best, most expensive template version of a role we can currently afford
function bestAffordableRoleTemplate(spawner, role, energy)
{
    var levelsForThisRole = Math.min(role.templates.length,spawner.room.controller.level);

    for (let l = levelsForThisRole-1; l >= 0; l--)
    {
        var cost  = 0;

        // Sum up the cost of all the parts for this template level
        for (let p=0; p<role.templates[l].body.length; p++)
        {
            var bodyPart = role.templates[l].body[p];
            cost += BODYPART_COST[bodyPart];
        }

        if (cost <= energy)
            return role.templates[l];
    }

    return undefined;
}

module.exports = {

    run: function(spawner)
    {
        spawn(spawner);
    }
};