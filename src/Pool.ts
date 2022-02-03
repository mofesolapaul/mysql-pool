import Connection from "./connection";

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export default class Pool {
  // used to run queries
  // user can specify connection config
  // user specifies how many queries to runqueries: any[];

  private connections: {};
  private queries: any[];
  private maxQueries: number;
  private maxConnections: number;

  constructor(maxQueries = 10, maxConnections = 3) {
    this.queries = [];
    this.connections = {};
    this.maxQueries = maxQueries;
    this.maxConnections = maxConnections;
  }

  addQuery(query): this {
    if (this.queries.length < this.maxQueries) {
      this.queries.push(query);
    }
    return this;
  }

  private getConnection() {
    const index = Object.keys(this.connections).length;

    if (index < this.maxConnections) {
      const connection = new Connection(index);
      this.connections[index] = connection;

      return connection;
    }

    return null;
  }

  private runQuery(query, connection) {
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

  execute(): void {
    this.queries.splice(0, this.maxConnections).forEach((query) => {
      this.runQuery(query, this.getConnection());
    });
  }
}
