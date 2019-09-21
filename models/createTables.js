var appDa0 = require('./appDa0');
var Event = require('./event');
var Actor = require('./actor');
var Repo = require('./repo');

var createDatabases = () => {
    var event = new Event(appDa0);
    var actor = new Actor(appDa0);
    var repo = new Repo(appDa0);

    event.createTable().then(() => {
    actor.createTable().then(() => {
    repo.createTable().then(() => {
        console.log('Tables created');
            })
        })
    })
    .catch((error) => {
        console.log(error);
    })
}

createDatabases();
