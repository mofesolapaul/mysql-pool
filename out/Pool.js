"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};
class Pool {
    constructor(maxQueries = 10, maxConnections = 3) {
        this.queries = [];
        this.connections = {};
        this.maxQueries = maxQueries;
        this.maxConnections = maxConnections;
    }
    addQuery(query) {
        if (this.queries.length < this.maxQueries) {
            this.queries.push(query);
        }
        return this;
    }
    getConnection() {
        const index = Object.keys(this.connections).length;
        if (index < this.maxConnections) {
            const connection = new connection_1.default(index);
            this.connections[index] = connection;
            return connection;
        }
        return null;
    }
    runQuery(query, connection) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(null);
            }, random(1, 5) * 100);
        }).then(() => {
            // remove the connection and continue processing the pool
            console.log(`Query '${query}' executed`);
            delete this.connections[connection.id];
            if (this.queries.length) {
                this.runQuery(this.queries.shift(), this.getConnection());
            }
        });
    }
    execute() {
        this.queries.splice(0, this.maxConnections).forEach((query) => {
            this.runQuery(query, this.getConnection());
        });
    }
}
exports.default = Pool;
