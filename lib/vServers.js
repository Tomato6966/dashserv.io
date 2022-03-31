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

    async getAll() {
        return new Promise(async (resolve, reject) => {
            const data = await this.util.request(`/vserver`);
            if(!data.success) {
                return reject(new DashservError(data.data))
            }
            else return resolve(data.data);
        })
    }

    async getSingleServer(ServerId) {
        return new Promise(async (resolve, reject) => {
            if(!ServerId) return reject(new DashservError("No ServerId (UUID) provided!"))
            const data = await this.util.request(`/vserver/${ServerId}`);
            if(!data.success) {
                return reject(new DashservError(data.data))
            }
            else return resolve(data.data);
        })
    }

    async getAvailableImages() {
        return new Promise(async (resolve, reject) => {
            const data = await this.util.request(`/vserver/${ServerId}`);
            if(!data.success) {
                return reject(new DashservError(data.data))
            }
            else return resolve(data.data);
        })
    }
    
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
    async forceShutdownServer(ServerId) {
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
     * @param {string} ServerId uuid of the Server
     * @returns 
     */
     async gracefullyRestartServer(ServerId) {
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
     * @param {string} ServerId uuid of the Server
     * @returns 
     */
    async forcefullyResetServer(ServerId) {
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
