#!/usr/bin/env node

const net = require('net');

function isPortAvailable(port) {
  return new Promise(resolve => {
    const server = net.createServer();

    server.listen(port, () => {
      server.once('close', () => {
        resolve(true);
      });
      server.close();
    });

    server.on('error', () => {
      resolve(false);
    });
  });
}

async function findAvailablePort(startPort = 3000) {
  let port = startPort;

  while (port < startPort + 100) {
    // Check up to 100 ports
    if (await isPortAvailable(port)) {
      return port;
    }
    port++;
  }

  throw new Error(`No available port found between ${startPort} and ${startPort + 99}`);
}

async function main() {
  try {
    const port = await findAvailablePort(3000);
    console.log(port);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { findAvailablePort, isPortAvailable };
