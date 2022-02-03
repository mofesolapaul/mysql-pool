"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool_1 = require("./Pool");
const pool = new Pool_1.default();
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(q => pool.addQuery(q));
pool.execute();
