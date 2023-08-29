const { createClient } = require("redis");

const client = createClient({
  password: process.env.REDIS_PASSWD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

module.exports = { client };
