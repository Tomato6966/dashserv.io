// importing the files
const Dashserv = require("./lib/Dashserv");
// function for creating a new Api Wrapper
function DashservApi(options) {
    return new Dashserv(options);
}
Dashserv.DashservApi = DashservApi;
Dashserv.version = require("./package.json").version;
Dashserv.author = require("./package.json").author;
// exporting this Api Wrapper
module.exports = DashservApi;