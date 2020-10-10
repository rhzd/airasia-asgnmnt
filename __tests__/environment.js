const NodeEnvironment = require('jest-environment-node');
const { MongoMemoryServer } = require("mongodb-memory-server");

const MemoryDatabaseServer = require('../src/lib/MemoryDatabaseServer');

class CustomEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();
    let mongoServer = new MongoMemoryServer();
    const URI = await mongoServer.getUri();
    this.global.__DB_URL__ = URI
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = CustomEnvironment;
