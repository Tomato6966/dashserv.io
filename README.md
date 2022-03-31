<div align="center">
  <p> 
    <a href="https://discord.gg/FQGXbypRf8" title="Join our Discord Server"><img alt="Built with Love" src="https://forthebadge.com/images/badges/built-with-love.svg"></a>
    <a href="https://discord.gg/FQGXbypRf8" title="Join our Discord Server"><img alt="Made with Javascript" src="https://forthebadge.com/images/badges/made-with-javascript.svg"></a>
  </p>
  <p>
    <a href="https://discord.gg/FQGXbypRf8"><img src="https://discord.com/api/guilds/773668217163218944/embed.png" alt="Discord server"/></a>
    <a href="https://www.npmjs.com/package/discord-yt-poster"><img src="https://img.shields.io/npm/v/discord-yt-poster.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/discord-yt-poster"><img src="https://img.shields.io/npm/dt/discord-yt-poster.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://discord.gg/FQGXbypRf8"><img src="https://maintained.cc/SDBagel/Maintained/2?" alt="Get Started Now"></a>
    <a href="https://www.patreon.com/MilratoDevelopment?fan_landing=true"><img src="https://img.shields.io/badge/donate-patreon-F96854.svg" alt="Patreon" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/discord-yt-poster/"><img src="https://nodei.co/npm/discord-yt-poster.png?downloads=true&stars=true" alt="npm installnfo" /></a>
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

## 📫 **Join [Discord Server](https://discord.gg/FQGXbypRf8) for Support**

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
