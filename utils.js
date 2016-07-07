/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('utils');
 * mod.thing == 'a thing'; // true
 */


module.exports = {
    clearMemory:  function()
    {
        // Clear memory
        for (let name in Memory.creeps)
        {
            if (Game.creeps[name] == undefined)
                delete Memory.creeps[name];
        }
    },

    suicideAllCreeps: function()
    {
        for (let name in Game.creeps)
        {
            var creep = Game.creeps[name];
            creep.suicide();
        }
    }
};