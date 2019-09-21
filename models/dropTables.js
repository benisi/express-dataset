var appDa0 = require('./appDa0');
var Event = require('./event');
var Actor = require('./actor');
var Repo = require('./repo');

var dropDatabases = function(){
    var event = new Event(appDa0);
    var actor = new Actor(appDa0);
    var repo = new Repo(appDa0);

    event.dropTable().then(() => {
    actor.dropTable().then(() => {
    repo.dropTable().then(() => {
        console.log('Tables dropped');
            })
        })
    })
    .catch(function(error){
        console.log(error);
    })
}

dropDatabases();
