<div align="center">
  <p> 
    <a href="https://discord.gg/PMbNfVSa" title="Join our Discord Server"><img alt="Built with Love" src="https://forthebadge.com/images/badges/built-with-love.svg"></a>
    <a href="https://discord.gg/PMbNfVSa" title="Join our Discord Server"><img alt="Made with Javascript" src="https://forthebadge.com/images/badges/made-with-javascript.svg"></a>
  </p>
  <p>
    <a href="https://discord.gg/PMbNfVSa"><img src="https://discord.com/api/guilds/773668217163218944/embed.png" alt="Discord server"/></a>
    <a href="https://www.npmjs.com/package/dashserv.io"><img src="https://img.shields.io/npm/v/dashserv.io.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/dashserv.io"><img src="https://img.shields.io/npm/dt/dashserv.io.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://discord.gg/PMbNfVSa"><img src="https://maintained.cc/SDBagel/Maintained/2?" alt="Get Started Now"></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/dashserv.io/"><img src="https://nodei.co/npm/dashserv.io.png?downloads=true&stars=true" alt="npm installnfo" /></a>
  </p>
</div>


# **dashserv.io**
>
> *This is an API Wrapper for the API of [dashserv.io](https://dashserv.io/api)*
> *It uses promises, so you can await the functions or .then().catch() them!*

## **Installation** 
```sh
npm install dashserv.io@latest
```

```js
const DashServApi = require("dashserv.io");
const DashServ = new DashServApi("API-TOKEN");

// get all your Servers:
DashServ.vServer.getAll() 
  .catch(console.error) // don't forget to catch errors!
  .then(console.log);
// start Server:
DashServ.vServer.start() 
  .catch(console.error) // don't forget to catch errors!
  .then(console.log);
// stop Server:
DashServ.vServer.shutdownServer() 
  .catch(console.error) // don't forget to catch errors!
  .then(console.log);
```

## 📫 **Join [Discord Server](https://discord.gg/PMbNfVSa) for Support**

***

# 🗂 **For more help view [Documentation](https://docs.dashserv.io)**

# [Get an API-Token here](https://account.dashserv.io/account/api)



```js
// way of awaiting something...

const DashServApi = require("dashserv.io");
const DashServ = new DashServApi("API-TOKEN");
(async() => {
  try {
    // get all your Servers:
    const data = await DashServ.vServer.getAll() 
    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();
```

# Methods:

## Order / Product
```js
// Currently - none
```
## Dedicated Servers
```js
// Currently - none
```
## V-Servers
```js
// PROPERTY: Shows all validActions
DashServ.vServer.validActions
/**
 * METHODS:
*/
// Lists all vservers in your account
await DashServ.vServer.getAll(); 
// Lists a the single vserver
await DashServ.vServer.getServerData(ServerId);
// List all available images
await DashServ.vServer.getAvailableImages();
// Show Status of a Vserver
await DashServ.vServer.getStatus(ServerId);
// Changes the Resources of cpu, ram and disk amount, if configurated server (+- € + autorestarts)
await DashServ.vServer.changeResource(ServerId, newCpuAmount, newRamAmount, newDiskAmount);
// Starts the Server
await DashServ.vServer.startServer(ServerId);
// shutdowns the Server
await DashServ.vServer.shutdownServer(ServerId);
// stops the Server
await DashServ.vServer.stopServer(ServerId);
// restart the Server
await DashServ.vServer.restartServer(ServerId);
// Resets a Server to default image
await DashServ.vServer.forceResetServer(ServerId);
// reinstalls the server and restarts it with the new image
await DashServ.vServer.reinstallServer(ServerId, image);
// resets the root password
await DashServ.vServer.resetPassword(ServerId);
// Shows all backups
await DashServ.vServer.listBackups(ServerId);
// Creates a backup with a custom name
await DashServ.vServer.createBackup(ServerId, name);
// deletes a created backup with a backup id
await DashServ.vServer.deleteBackup(ServerId, backupUuid);
// restores a backup of a backup id and restarts the server
await DashServ.vServer.restoreBackup(ServerId, backupUuid);
// get all tasks
await DashServ.vServer.getTasks(ServerId);
// get all scheduled tasks
await DashServ.vServer.getScheduledTasks(ServerId);
// create a scheduled task, with a interval and a command (and a optimal nextexecution : timestamp)
await DashServ.vServer.createScheduledTask(ServerId, interval, command, nextexecution[optionial]);
// delete a scheduled task
await DashServ.vServer.deleteScheduledTask(ServerId, taskuuid);
// get all Graphs of a specific timeframe!
await DashServ.vServer.getGraphs(ServerId, timeframe);
```