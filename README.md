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

## Dedicated Servers
```js
// Currently - none
```
## V-Servers
```js
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

await DashServ.vServer.forceResetServer(ServerId);
```