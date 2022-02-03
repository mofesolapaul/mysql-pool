function doConnect() {
  // connection assumed to be established here
  return {};
}

export default class Connection {
  id: any;
  connection: object;

  constructor(id) {
    this.id = id;
    this.connection = doConnect();
  }
}
