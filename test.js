const Api = require("./lib/Dashserv")
const Dashserv = new Api("TOKEN");
(async () => {
    const d = await Dashserv.vServer.getAll().catch(console.error)
    // finde den server mit dem namen milrato und nutze ihn
    const ServerStatus = await Dashserv.vServer.startServer( d.find(d => d.name == "milrato").uuid);
    // Zeige response an
    console.log(ServerStatus);
})();