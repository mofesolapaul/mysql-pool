"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function doConnect() {
    // connection assumed to be established here
    return {};
}
class Connection {
    constructor(id) {
        this.id = id;
        this.connection = doConnect();
    }
}
exports.default = Connection;
