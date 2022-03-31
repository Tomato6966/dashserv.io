const UtilClass = require("./util");
const { DashservError } = require("./errors");
class DashservApi {
    /**
     * @param {STRING} token Bearer Token for accessing the API
     */
     constructor(headers) {
        this.util = new UtilClass(headers);
        // if no method added, use this, throw error
        if (!this.constructor && !this.constructor.name) {
            throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
        }
    }

    /**
     * Lists all vservers in your account
     * https://docs.dashserv.io/#vserver-get-all
     * @returns object / error
     */
    async getAll() {
        return new Promise(async (resolve, reject) => {
            const data = await this.util.request(`/vserver`);
            if(!data.success) {
                return reject(new DashservError(data.data))
            }
            else return resolve(data.data);
        })
    }

    /**
     * Lists a the single vserver
     * https://docs.dashserv.io/#vserver-get-single
     * @param {string} ServerId uuid 
     * @returns server-data
     */
    async getServerData(ServerId) {
        return new Promise(async (resolve, reject) => {
            if(!ServerId) return reject(new DashservError("No ServerId (UUID) provided!"))
            const data = await this.util.request(`/vserver/${ServerId}`);
            if(!data.success) {
                return reject(new DashservError(data.data))
            }
            else return resolve(data.data);
        })
    }

    /**
     * Lists all available images for reinstallation
     * https://docs.dashserv.io/#vserver-get-images
     * @returns array
     */
    async getAvailableImages() {
        return new Promise(async (resolve, reject) => {
            const data = await this.util.request(`/vserver/image`);
            if(!data.success) {
                return reject(new DashservError(data.data))
            }
            else return resolve(data.data);
        })
    }
    
    /**
     * Returns the status and stats of the vserver. If data->locked is not false it will be a string with the reason why vserver actions cant be executed at the moment. The locked state will automaticly revert after some time.
     * https://docs.dashserv.io/#vserver-get-status
     * @param {string} ServerId uuid 
     * @returns object
     */
    async getStatus(ServerId) {
        return new Promise(async (resolve, reject) => {
            if(!ServerId) return reject(new DashservError("No ServerId (UUID) provided!"))
            const data = await this.util.request(`/vserver/${ServerId}/status`);
            if(!data.success) {
                return reject(new DashservError(data.data))
            }
            else return resolve(data.data);
        })
    }

    /**
     * This changes the resources of the vserver - only available for configured vserver. The vserver will automaticly restart if the operation was successfull. The pricing for upgrades can be taken from the current product pricing. https://docs.dashserv.io/#order-get-product
     * https://docs.dashserv.io/#vserver-upgrade
     * @param {string} ServerId uuid
     * @param {Number} newCpuCount new Cpu amount in GB
     * @param {Number} newRamGB new Ram amount in GB
     * @param {Number} newDiskGB new storage amount in GB
     * @returns string
     */
    async changeResource(ServerId, newCpuCount, newRamGB, newDiskGB) {
        return new Promise(async (resolve, reject) => {
            if(!ServerId) return reject(new DashservError("No ServerId (UUID) provided!"))
            if(!newCpuCount) return reject(new DashservError("No newCpuCount provided!"))
            if(!newRamGB) return reject(new DashservError("No newRamGB provided!"))
            if(!newDiskGB) return reject(new DashservError("No newDiskGB provided!"))
            const body = {
                "uuid": String(ServerId),
                "cpu": Number(newCpuCount),
                "ram": Number(newRamGB),
                "disk": Number(newDiskGB),
            }
            const data = await this.util.request(`/vserver/${ServerId}/upgrade`, "PUT", body);
            if(!data.success) {
                return reject(new DashservError(data.data))
            }
            else return resolve(data.data);
        })
    }

    /**
     * Starts the vserver. This returns a task uuid you can monitor for success or errors.
     * https://docs.dashserv.io/#vserver-action-start
     * @param {string} ServerId uuid 
     * @returns monitoring uuid
     */
    async startServer(ServerId) {
        return new Promise(async (resolve, reject) => {
            if(!ServerId) return reject(new DashservError("No ServerId (UUID) provided!"))
            const data = await this.util.request(`/vserver/${ServerId}/actions/start`, "POST");
            if(!data.success) {
                return reject(new DashservError(data.data))
            }
            else return resolve(data.data);
        })
    }

    /**
     * Shutdowns the vserver using ACPI signal. This returns a task uuid you can monitor for success or errors.
     * https://docs.dashserv.io/#vserver-action-shutdown
     * @param {string} ServerId uuid 
     * @returns monitoring uuid
     */    
    async shutdownServer(ServerId) {
        return new Promise(async (resolve, reject) => {
            if(!ServerId) return reject(new DashservError("No ServerId (UUID) provided!"))
            const data = await this.util.request(`/vserver/${ServerId}/actions/shutdown`, "POST");
            if(!data.success) {
                return reject(new DashservError(data.data))
            }
            else return resolve(data.data);
        })
    }
    
    /**
     * Forcefully stops the vserver. This action is equivalent of pulling the power plug and may lead to data loss. This returns a task uuid you can monitor for success or errors.
     * https://docs.dashserv.io/#vserver-action-stop
     * @param {string} ServerId uuid
     * @returns monitoring uuid
     */
    async stopServer(ServerId) {
        return new Promise(async (resolve, reject) => {
            if(!ServerId) return reject(new DashservError("No ServerId (UUID) provided!"))
            const data = await this.util.request(`/vserver/${ServerId}/actions/stop`, "POST");
            if(!data.success) {
                return reject(new DashservError(data.data))
            }
            else return resolve(data.data);
        })
    }
    
    /**
     * Gracefully restarts the vserver. First, shutdowns the vserver with an ACPI signal and boots again. This returns a task uuid you can monitor for success or errors.
     * https://docs.dashserv.io/#vserver-action-restart
     * @param {string} ServerId uuid of the Server
     * @returns 
     */
     async restartServer(ServerId) {
        return new Promise(async (resolve, reject) => {
            if(!ServerId) return reject(new DashservError("No ServerId (UUID) provided!"))
            const data = await this.util.request(`/vserver/${ServerId}/actions/restart`, "POST");
            if(!data.success) {
                return reject(new DashservError(data.data))
            }
            else return resolve(data.data);
        })
    }

    /**
     * Forcefully resets the vserver. This action is equivalent of pulling the power plug and putting it back in and may lead to data loss.
     * This returns a task uuid you can monitor for success or errors.
     * https://docs.dashserv.io/#vserver-action-stop
     * @param {string} ServerId uuid of the Server
     * @returns 
     */
    async forceResetServer(ServerId) {
        return new Promise(async (resolve, reject) => {
            if(!ServerId) return reject(new DashservError("No ServerId (UUID) provided!"))
            const data = await this.util.request(`/vserver/${ServerId}/actions/reset`, "POST");
            if(!data.success) {
                return reject(new DashservError(data.data))
            }
            else return resolve(data.data);
        })
    }
    
}
module.exports = DashservApi;
