class DashservErrors extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}


class DashservError extends DashservErrors {
    constructor(error) {
        super(error?.message || error);
        this.data = { error };
    }
}
module.exports = {
    DashservErrors,
    DashservError,
};