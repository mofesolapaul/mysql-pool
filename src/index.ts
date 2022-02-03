import Pool from "./Pool";

const pool = new Pool();
[1,2,3,4,5,6,7,8,9,10].forEach(q => pool.addQuery(q));

pool.execute();
