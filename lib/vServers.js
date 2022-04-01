const UtilClass = require("./util");
const { DashservError } = require("./errors");
class DashservApi {
    /**
     * @param {STRING} token Bearer Token for accessing the API
     */
    constructor(headers) {
        this.util = new UtilClass(headers);
        this.validActions = {
            validIntervals: ["DAILY", "TWODAYS", "THREEDAYS", "WEEKLY", "TWOWEEKS", "MONTHLY", "TWOMONTHS", "THREEMONTHS", "SIXMONTHS", "YEARLY"],
            validCommands: ["RESTART", "BACKUP", "SHUTDOWN", "START"],
            validTimeFrames: ["hour", "day", "week", "month", "year"],
        }
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
            const data = await this.util.request(`/vserver`, "GET");
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }

    /**
     * Lists a the single vserver
     * https://docs.dashserv.io/#vserver-get-single
     * @param {string} ServerId product uuid of the Server 
     * @returns server-data
     */
    async getServerData(ServerId) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            const data = await this.util.request(`/vserver/${ServerId}`, "GET");
            if(!data.success) {
                const APIERROR = new DashservError(String(data.data));
                return reject(APIERROR);
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
            const data = await this.util.request(`/vserver/image`, "GET");
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }
    
    /**
     * Returns the status and stats of the vserver. If data->locked is not false it will be a string with the reason why vserver actions cant be executed at the moment. The locked state will automaticly revert after some time.
     * https://docs.dashserv.io/#vserver-get-status
     * @param {string} ServerId product uuid of the Server 
     * @returns object
     */
    async getStatus(ServerId) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            const data = await this.util.request(`/vserver/${ServerId}/status`, "GET");
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }

    /**
     * This changes the resources of the vserver - only available for configured vserver. The vserver will automaticly restart if the operation was successfull. The pricing for upgrades can be taken from the current product pricing. https://docs.dashserv.io/#order-get-product
     * https://docs.dashserv.io/#vserver-upgrade
     * @param {string} ServerId product uuid of the Server
     * @param {Number} newCpuCount new Cpu amount in GB
     * @param {Number} newRamGB new Ram amount in GB
     * @param {Number} newDiskGB new storage amount in GB
     * @returns string
     */
    async changeResource(ServerId, newCpuCount, newRamGB, newDiskGB) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            
            const noNewCpuCount = new DashservError("No newCpuCount provided!")
            if(!newCpuCount) return reject(noNewCpuCount)
            
            const noNewRamGBCount = new DashservError("No newRamGB provided!")
            if(!newRamGB) return reject(noNewRamGBCount)

            const noNewDiskGBCount = new DashservError("No newDiskGB provided!")
            if(!newDiskGB) return reject(noNewDiskGBCount)
            
            const invalidNewCpuCount = new DashservError(`For newCpuCount a ${typeof newCpuCount} provided but a "number" was expected!`)
            if(typeof newCpuCount != "number") return reject(invalidNewCpuCount)

            const invalidNewRamCountGB = new DashservError(`For newRamGB a ${typeof newRamGB} provided but a "number" was expected!`);
            if(typeof newRamGB != "number") return reject(invalidNewRamCountGB)

            const invalidNewDiskCountGB = new DashservError(`For newDiskGB a ${typeof newDiskGB} provided but a "number" was expected!`)
            if(typeof newDiskGB != "number") return reject(invalidNewDiskCountGB)
            
            const params = new URLSearchParams();
            params.append("cpu", Number(newCpuCount));
            params.append("ram", Number(newRamGB));
            params.append("disk", Number(newDiskGB));

            const data = await this.util.request(`/vserver/${ServerId}/upgrade`, "PUT", params);
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }

    /**
     * Starts the vserver. This returns a task uuid you can monitor for success or errors.
     * https://docs.dashserv.io/#vserver-action-start
     * @param {string} ServerId product uuid of the Server 
     * @returns monitoring uuid
     */
    async startServer(ServerId) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            const data = await this.util.request(`/vserver/${ServerId}/actions/start`, "POST");
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }

    /**
     * Shutdowns the vserver using ACPI signal. This returns a task uuid you can monitor for success or errors.
     * https://docs.dashserv.io/#vserver-action-shutdown
     * @param {string} ServerId product uuid of the Server 
     * @returns monitoring uuid
     */    
    async shutdownServer(ServerId) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            const data = await this.util.request(`/vserver/${ServerId}/actions/shutdown`, "POST");
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }
    
    /**
     * Forcefully stops the vserver. This action is equivalent of pulling the power plug and may lead to data loss. This returns a task uuid you can monitor for success or errors.
     * https://docs.dashserv.io/#vserver-action-stop
     * @param {string} ServerId product uuid of the Server
     * @returns monitoring uuid
     */
    async stopServer(ServerId) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            const data = await this.util.request(`/vserver/${ServerId}/actions/stop`, "POST");
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }
    
    /**
     * Gracefully restarts the vserver. First, shutdowns the vserver with an ACPI signal and boots again. This returns a task uuid you can monitor for success or errors.
     * https://docs.dashserv.io/#vserver-action-restart
     * @param {string} ServerId product uuid of the Server
     * @returns monitoring uuid
     */
     async restartServer(ServerId) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            const data = await this.util.request(`/vserver/${ServerId}/actions/restart`, "POST");
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }

    /**
     * Forcefully resets the vserver. This action is equivalent of pulling the power plug and putting it back in and may lead to data loss.
     * This returns a task uuid you can monitor for success or errors.
     * https://docs.dashserv.io/#vserver-action-stop
     * @param {string} ServerId product uuid of the Server
     * @returns monitoring uuid
     */
    async forceResetServer(ServerId) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            const data = await this.util.request(`/vserver/${ServerId}/actions/reset`, "POST");
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }
    
    /**
     * This will override all data on the vserver with the new selected image. The vserver will get forcefully stopped and then the new image will be written on the disk. This process may take some time. The status of the vserver will change from offline|online to installing.
     * This returns a task uuid you can monitor for success or errors
     * https://docs.dashserv.io/#vserver-reinstall
     * @param {string} ServerId product uuid of the Server 
     * @param {string} image uuid of the new image https://docs.dashserv.io/#vserver-get-images
     * @returns 
     */
    async reinstallServer(ServerId, image) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            
            const noImage = new DashservError("No newCpuCount provided!")
            if(!image) return reject(noImage)
            const noValidImage = new DashservError(`For newCpuCount a ${typeof image} provided but a "string" was expected!`)
            if(typeof image != "string") return reject(noValidImage)
            
            const params = new URLSearchParams();
            params.append("image", String(image));

            const data = await this.util.request(`/vserver/${ServerId}/reinstall`, "POST", params);
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }
    
    /**
     * Reset the root password and will return the new generated password. The password will change without the need of a reboot using the qemu-guest-agent.
     * https://docs.dashserv.io/#vserver-reset-password
     * @param {string} ServerId product uuid of the Server 
     * @returns password
     */
     async resetPassword(ServerId) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            
            const data = await this.util.request(`/vserver/${ServerId}/password`, "POST");
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }
    
    /**
     * Lists all available backups of the vserver. If a backup is creating, the percentage will show the current creation progress.
     * https://docs.dashserv.io/#vserver-list-backups
     * @param {string} ServerId product uuid of the Server 
     * @returns array
     */
     async listBackups(ServerId) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            
            const data = await this.util.request(`/vserver/${ServerId}/backup`, "GET");
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }
    
    /**
     * Creates a new backup. If the limit of backups for the vserver is reached, the oldest one will get deleted.
     * https://docs.dashserv.io/#vserver-create-backup
     * @param {string} ServerId product uuid of the Server 
     * @param {string} name Wished Name of the Backup
     * @returns string
     */
     async createBackup(ServerId, name) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)

            if(!name) return reject(new DashservError("No name (backup) provided!"))
            if(typeof name != "string") return reject(new DashservError(`For name (backup) a ${typeof name} provided but a "string" was expected!`))
            
            const params = new URLSearchParams();
            params.append("name", String(name));

            const data = await this.util.request(`/vserver/${ServerId}/backup`, "POST", params);
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }

    /**
     * Deletes a backup
     * https://docs.dashserv.io/#vserver-delete-backup
     * @param {string} ServerId product uuid of the Server 
     * @param {string} backupUuid uuid of the backup
     * @returns string
     */
    async deleteBackup(ServerId, backupUuid) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            if(!backupUuid) return reject(new DashservError("No backupUuid (backupID) provided!"))
            if(typeof backupUuid != "string") return reject(new DashservError(`For backupUuid (backupID) a ${typeof backupUuid} provided but a "string" was expected!`))
            
            const params = new URLSearchParams();
            params.append("backupUuid", String(backupUuid));

            const data = await this.util.request(`/vserver/${ServerId}/backup/${backupUuid}`, "POST", params);
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }

    /**
     * Restores a backup. The locked parameter of the status will be enabled and disabled once the restore process has finished.
     * https://docs.dashserv.io/#vserver-restore-backup
     * @param {string} ServerId product uuid of the Server 
     * @param {string} backupUuid uuid of the backup
     * @returns string
     */
    async restoreBackup(ServerId, backupUuid) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            if(!backupUuid) return reject(new DashservError("No backupUuid (backupID) provided!"))
            if(typeof backupUuid != "string") return reject(new DashservError(`For backupUuid (backupID) a ${typeof backupUuid} provided but a "string" was expected!`))
            
            const params = new URLSearchParams();
            params.append("backupUuid", String(backupUuid));

            const data = await this.util.request(`/vserver/${ServerId}/backup/${backupUuid}`, "PUT", params);
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }

    /**
     * Returns all tasks of the vserver. unix.end is null if the task is still running.
     * https://docs.dashserv.io/#vserver-get-tasks
     * @param {string} ServerId product uuid of the Server 
     * @returns array
     */
     async getTasks(ServerId) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            
            const data = await this.util.request(`/vserver/${ServerId}/tasks`, "GET");
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }
    
    /**
     * Returns all scheduled tasks of the vserver.
     * https://docs.dashserv.io/#vserver-get-scheduled-tasks
     * @param {string} ServerId product uuid of the Server 
     * @returns array
     */
    async getScheduledTasks(ServerId) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            
            const data = await this.util.request(`/vserver/${ServerId}/tasks/scheduled`, "GET");
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }

    /**
     * Creates a scheduled task for the vserver. Available intervals:
     * DAILY, TWODAYS, THREEDAYS, WEEKLY, TWOWEEKS, MONTHLY, TWOMONTHS, THREEMONTHS, SIXMONTHS, YEARLY
     * Available commands:
     * RESTART, BACKUP, SHUTDOWN, START
     * https://docs.dashserv.io/#vserver-create-scheduled-task
     * @param {string} ServerId product uuid of the Server 
     * @param {string} interval the interval the command should be executed
     * @param {string} command the command that should be executed
     * @param {timestamp} nextexecution OPTIMAL - The first execution. Leave empty to set to now
     * @returns string
     */
    async createScheduledTask(ServerId, interval, command, nextexecution = false) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            const { validIntervals, validCommands } = this.validActions;

            if(!interval) return reject(new DashservError("No interval provided!"))
            if(!command) return reject(new DashservError("No command provided!"))
            
            if(typeof interval != "string") return reject(new DashservError(`For interval a ${typeof interval} provided but a "string" was expected!`))
            if(typeof command != "string") return reject(new DashservError(`For command a ${typeof command} provided but a "string" was expected!`))
            
            if(!validIntervals.includes(interval)) return reject(new DashservError(`Received for interval ${interval} but expected a valid one: (${validIntervals.join(", ")})!`))
            if(!validCommands.includes(command)) return reject(new DashservError(`Received for command ${command} but expected a valid one: (${validCommands.join(", ")})!`))
            
            if(nextexecution && (typeof nextexecution != "number" || Number(nextexecution) > Date.now())) return reject(new DashservError(`Received for nextexecution ${nextexecution} but expected a number bigger than ${Date.now()} (current timestamp)!`))

            const params = new URLSearchParams();
            params.append("interval", String(interval));
            params.append("command", String(command));
            if(nextexecution) params.append("nextexecution", Number(nextexecution));

            const data = await this.util.request(`/vserver/${ServerId}/tasks/scheduled`, "POST", params);
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }
    
    /**
     * Delete scheduled task
     * https://docs.dashserv.io/#vserver-delete-scheduled-task
     * @param {string} ServerId product uuid of the Server 
     * @param {string} taskuuid uuid of the scheduled Task
     * @returns string
     */
     async deleteScheduledTask(ServerId, taskuuid) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            if(!taskuuid) return reject(new DashservError("No taskuuid provided!"))
            if(typeof taskuuid != "string") return reject(new DashservError(`For taskuuid a ${typeof taskuuid} provided but a "string" was expected!`))
            
            const params = new URLSearchParams();
            params.append("taskuuid", String(taskuuid));
            
            const data = await this.util.request(`/vserver/${ServerId}/tasks/scheduled`, "DELETE", params);
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }

    /**
     * Get graphs
     * https://docs.dashserv.io/#vserver-get-graphs
     * @param {string} ServerId product uuid of the Server 
     * @param {string} timeframe allowed values: hour, day, week, month, year
     * @returns array
     */
    async getGraphs(ServerId, timeframe) {
        return new Promise(async (resolve, reject) => {
            const MissingServerIdError = new DashservError("No ServerId (uuid) provided!");
            if(!ServerId) return reject(MissingServerIdError)
            const WrongServerId = new DashservError(`For ServerId (uuid) a ${typeof ServerId} provided but a "string" was expected!`);
            if(typeof ServerId != "string") return reject(WrongServerId)
            if(!timeframe) return reject(new DashservError("No timeframe provided!"))
            if(typeof timeframe != "string") return reject(new DashservError(`For timeframe a ${typeof timeframe} provided but a "string" was expected!`))
            
            const { validTimeFrames } = this.validActions;
            const timeFrameError = new DashservError(`Received for timeframe ${timeframe} but expected a valid one: (${validTimeFrames.join(", ")})!`);
            if(!validTimeFrames.includes(timeframe)) return reject(timeFrameError)
            
            const params = new URLSearchParams();
            params.append("timeframe", String(timeframe));
            


            const data = await this.util.request(`/vserver/${ServerId}/stats?timeframe=${timeframe}`, "GET");
            if(!data.success) {
                const APIERROR = new DashservError(data.data);
                return reject(APIERROR);
            }
            else return resolve(data.data);
        })
    }
}
module.exports = DashservApi;
