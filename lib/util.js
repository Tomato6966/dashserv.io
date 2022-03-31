/*
    MIT License

    Copyright (c) 2021 Tomato6966 (chris.pre03@gmail.com)

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

//Import the Utils
const fetch = require("node-fetch");
const { DashservError } = require("./errors");
const baseURL = `https://api.dashserv.io/v1/product`;
        
class DashservApiUtil {
    /**
     * @param {STRING} token Bearer Token for accessing the API
     */
    constructor(headers) {
        this.headers = headers;
        // if no method added, use this, throw error
        if (!this.constructor && !this.constructor.name) {
            throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
        }
    }

    request(endpoint, method = "GET", body = false) {
        const requestData = {
            method: method,
            headers: this.headers,
        };
        if(body) requestData.body = JSON.stringify(body);
        return fetch(encodeURI(`${baseURL}${endpoint}`), requestData).then(async (response) => {
            if(!response) return new Error("No Data received");
            const jsonData = await response.json();
            if(!jsonData) return new Error("No JSON-Data received");
            return jsonData;
        }).catch((error) => {
          return error;
        });
    }
}
module.exports = DashservApiUtil;
